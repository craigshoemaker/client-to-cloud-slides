import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { DataService } from '../data.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent extends BaseComponent implements OnInit {

  isSyncing = false;
  doLiveSync = false;

  constructor(private data: DataService, private messenger: MessageService) {
    super();
  }

  ngOnInit() {
    this.messenger.subscribe(this.messenger.events.data.sync.completed, () => this.syncComplete());
    this.messenger.subscribe(this.messenger.events.database.changed.remoteSource, () => {
      this.syncCancel();
    });
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
    this.data.sync(this.doLiveSync);
  }

}
