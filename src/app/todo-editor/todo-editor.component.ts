import { Component, Input, OnInit, NgZone } from '@angular/core';
import { DataService, IGetOptions } from '../data.service';
import { MessageService } from '../message.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-todo-editor',
  templateUrl: './todo-editor.component.html',
  styleUrls: ['./todo-editor.component.css']
})
export class TodoEditorComponent implements OnInit {

  @Input()
  source: string;

  @Input()
  showDeleteButton = true;

  @Input()
  showGetButton = false;

  isRemote = false;
  isLocal = true;

  showRemoteLink = false;

  remoteAdminURL = '';
  todos: any = [];

  constructor(private data: DataService,
              private messenger: MessageService,
              private zone: NgZone,
              private config: ConfigService) { }

  ngOnInit() {
    this.messenger.subscribe(this.messenger.events.database.initialized, () => this.getAll());
    this.messenger.subscribe(this.messenger.events.database.changed.at(this.source), () => {
      this.zone.run(() => {
        this.getAll();
      });
    });
    this.messenger.subscribe(this.messenger.events.data.conflict.resolved, () => {
      this.zone.run(() => {
        this.getAll();
      });
    });
    this.messenger.subscribe(this.messenger.events.database.changed.remoteSource, () => this.remoteSourceChanged());
    this.messenger.subscribe(this.messenger.events.config.loaded, () => {
      this.remoteAdminURL = this.config.getRemoteAdminURL();
    });

    this.showRemoteLink = (this.source === 'remote');
    this.isRemote = this.source === 'remote';
    this.isLocal = this.source === 'local';
  }

  remoteSourceChanged() {
    this.remoteAdminURL = this.config.getRemoteAdminURL();
    this.getAll();
  }

  getAll() {
    this.data.getAll(this.source).then(rows => {
      this.todos = rows.map(row => {
        row.showDeleteButton = JSON.parse(this.showDeleteButton.toString());
        row.showGetButton = JSON.parse(this.showGetButton.toString());
        return row;
      });
    });
  }

  async getConflicts(e: any, id: string) {
    const options: IGetOptions = {
      conflicts: true,
      revs: true,
      open_revs: 'all'
    };
    let conflicts = await this.data.get(this.source, id, options);
    conflicts = conflicts.filter(conflict => {
      return conflict.ok && !conflict.ok._deleted;
    });
    this.messenger.broadcast(this.messenger.events.data.todo.conflicts, conflicts);
  }

  save(e: any, id: string) {
    const el = e.currentTarget;
    const title = el.value;
    const isNew = (id === undefined);

    if (isNew) {
      el.value = '';
    }

    this.data.save(this.source, id, title);
  }

  delete(e: any, id: string) {
    this.data.delete(this.source, id);
  }

}
