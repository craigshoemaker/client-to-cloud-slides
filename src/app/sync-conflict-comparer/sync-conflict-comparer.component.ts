import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { DataService, Todo } from '../data.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-sync-conflict-comparer',
  templateUrl: './sync-conflict-comparer.component.html',
  styleUrls: ['./sync-conflict-comparer.component.css']
})
export class SyncConflictComparerComponent extends BaseComponent implements OnInit {

  isSyncing = false;
  showConflicts = false;
  conflicts = [];

  constructor(private data: DataService, private messenger: MessageService) {
    super();

    this.messenger.subscribe(this.messenger.events.data.todo.conflicts, todo => this.getConflictsHandler(todo));
    this.messenger.subscribe(this.messenger.events.data.sync.completed, () => this.syncComplete());
    this.messenger.subscribe(this.messenger.events.database.changed.remoteSource, () => {
      this.syncCancel();
    });
  }

  getConflictsHandler(conflicts: any) {
    this.showConflicts = true;
    this.conflicts = conflicts;
  }

  ngOnInit() {
  }

  async resolve(e, todo) {
    this.showConflicts = false;
    this.conflicts = [];
    const response = await this.data.resolveConflict('local', todo._id, todo._rev);
    console.log(response);
  }

  syncComplete() {
    this.isSyncing = false;
  }

  syncCancel() {
    this.data.syncCancel();
    this.isSyncing = false;
  }

  sync() {
    this.isSyncing = true;
    this.data.sync(false);
  }
}
