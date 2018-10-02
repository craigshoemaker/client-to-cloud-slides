import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { MessageService } from '../message.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-local-conflict',
  templateUrl: './local-conflict.component.html',
  styleUrls: ['./local-conflict.component.css']
})
export class LocalConflictComponent extends BaseComponent implements OnInit {

  title = '';
  titleFinal = '';

  titleDatabase = '';
  revDatabase = '';

  titleIncoming = '';
  revIncoming = '';

  showConflictSelection = false;
  showConflictMessage = false;
  showConflictResolved = false;

  conflictError = '';

  options = null;
  todo = null;

  source = 'local';

  constructor(private data: DataService, private messenger: MessageService, private zone: NgZone) {
    super();
  }

  ngOnInit() {
    this.messenger.subscribe(this.messenger.events.todo.new, todo => {
      this.todo = Object.assign({}, todo);
      this.title = todo.title;

      this.showConflictMessage = false;
      this.showConflictSelection = false;
      this.showConflictResolved = false;
    });

    this.messenger.subscribe(this.messenger.events.data.conflict.local, options => this.displayConflictChoice(options));
  }

  displayConflictChoice(options) {
    this.options = options;

    this.titleDatabase = options.database.title;
    this.revDatabase = options.database._rev;

    this.titleIncoming = options.incoming.title;
    this.revIncoming = options.incoming._rev;

    this.showConflictSelection = true;

    this.conflictError = JSON.stringify(options.error, null, 2);
    this.showConflictMessage = true;
  }

  save() {
    this.todo.title = this.title;
    this.data.saveTodo(this.source, this.todo);
  }

  async resolveLocalConflict(selectedSource: string) {

    try {
      let title;
      let id;

      if (selectedSource === 'database') {
        title = this.options.database.title;
        id = this.options.database._id;
      } else {
        title = this.options.incoming.title;
        id = this.options.incoming._id;
      }

      const todo = await this.data.get(this.source, id);
      todo.title = title;

      const response = await this.data.saveTodo(this.source, todo);

      this.titleFinal = this.title;
      this.title = '';

      this.showConflictMessage = false;
      this.showConflictSelection = false;
      this.showConflictResolved = true;

      setTimeout(() => {
        this.zone.run(() => {
          this.showConflictResolved = false;
        });
      }, 10000);

    } catch (e) {
      console.log(e);
    }
  }

}
