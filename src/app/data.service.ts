import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { MessageService } from './message.service';

declare function require(a);
const PouchDB = require('pouchdb').default;

@Injectable({
  providedIn: 'root',
})
export class DataService {

  local: any;
  remote: any;
  syncer: any;

  constructor(private config: ConfigService, private messenger: MessageService) {

    this.messenger.subscribe(this.messenger.events.config.loaded, () => {
      this.local = new PouchDB(config.databaseName);
      this.instantiateRemoteDatabase();

      this.local.changes({ since: 'now', live: true })
        .on('change', () => { this.messenger.broadcast(this.messenger.events.database.changed.local); })
        .on('error', console.log);

      this.messenger.subscribe(this.messenger.events.config.remoteLocation.changed, () => {
        this.instantiateRemoteDatabase();
        this.messenger.broadcast(this.messenger.events.database.changed.remoteSource);
      });

      this.messenger.broadcast(this.messenger.events.database.initialized);
    });
  }

  instantiateRemoteDatabase() {
    const source = /azure/.test(this.config.getRemoteHostURL()) ? 'azure' : 'local';

    const options = {
      skipSetup: true,
      auth: {
        username: this.config.config[source].username,
        password: this.config.config[source].password
      }
    };

    this.remote = new PouchDB(this.config.getRemoteDatabaseURL(), options);

    this.remote.changes({ since: 'now', live: true })
      .on('change', () => { this.messenger.broadcast(this.messenger.events.database.changed.remote); })
      .on('error', console.log);
  }

  async getAll(source: string) {
    let rows = [];
    if (this[source]) {

      const options: IGetOptions = {
        include_docs: true,
        conflicts: true
      };

      const response = await this[source].allDocs(options);

      rows = response.rows.map(row => {
        const r = row.doc;
        r.hasConflicts = !!r._conflicts && r._conflicts.length > 0;
        return r;
      });
    }
    return rows;
  }

  async saveObject(source: string, todo: Todo) {
    try {
      const response = await this[source].put(todo);
    } catch (e) {
      console.log(e);

      if (e.name === 'conflict') {
        await this.broadcastConflict(e, source, todo);
      }
    }
  }

  async get(source: string, id: string, options?: IGetOptions) {
    try {
      let todo;

      if (options) {
        todo = await this[source].get(id, options);
      } else {
        todo = await this[source].get(id);
      }

      return todo;
    } catch (e) {
      console.log(e);
      this.messenger.broadcast(this.messenger.events.data.generalError, e);
    }
  }

  async save(source: string, id: string, title: string) {
    let todo;

    try {
      const isNew = !id;
      todo = new Todo();

      id = isNew ? new Date().toISOString() : id;

      if (isNew) {
        todo._id = id;
      } else {
        todo = await this[source].get(id);
      }

      todo.title = title;

      const result = await this[source].put(todo);

      todo._rev = result.rev;

      if (isNew) {
        this.messenger.broadcast(this.messenger.events.todo.new, todo);
      }

    } catch (e) {
      console.log(e);

      if (e.name === 'conflict') {
        await this.broadcastConflict(e, source, todo);
      }
    }
  }

  async broadcastConflict(e, source: string, todo: Todo) {
    const dbVersion = await this[source].get(e.id);
    this.messenger.broadcast(this.messenger.events.data.conflict.local,
      {
        error: e,
        database: dbVersion,
        incoming: todo
      });
  }

  async delete(source: string, id: string) {
    const todo = await this[source].get(id);
    this[source].remove(todo);
  }

  syncCancel() {
    if (this.syncer) {
      this.syncer.cancel();
    }
  }

  sync(doLiveSync: boolean) {
    const options = {
      retry: true,
      live: doLiveSync
    };

    this.syncer = this.local.sync(this.remote, options);

    this.syncer.on('change', (info) => {
      this.messenger.broadcast(this.messenger.events.data.sync.changed);
      console.log(info);
    }).on('paused', (err) => {
      this.messenger.broadcast(this.messenger.events.data.sync.paused);
      console.log('sync paused', err);
    }).on('active', () => {
      console.log('sync active');
    }).on('denied', (err) => {
      console.log('denied', err);
    }).on('complete', (info) => {
      this.messenger.broadcast(this.messenger.events.data.sync.completed);
      console.log('sync complete');
    }).on('error', (err) => {
      console.log('sync error', err);
    });
  }

  destroyLocalDatabase() {
    this.local.destroy();
  }

  async resolveConflict(source: string, id: string, winningRevId: string) {
    try {
      const options: IGetOptions = {
        conflicts: true
      };

      const todo = await this[source].get(id, options);

      let revIds = todo._conflicts;
      revIds.push(todo._rev);
      revIds = revIds.filter(conflictId => conflictId !== winningRevId);

      const conflicts = revIds.map(rev => {
        return {
          _id: todo._id,
          _rev: rev,
          _deleted: true
        };
      });

      const response = await this[source].bulkDocs(conflicts);
      this.messenger.broadcast(this.messenger.events.data.conflict.resolved);
      return response;
    } catch (e) {
      console.log(e);
      this.messenger.broadcast(this.messenger.events.data.generalError, e);
    }
  }
}

export interface IGetOptions {
  conflicts?: boolean;
  revs?: boolean;
  open_revs?: string;
  include_docs?: boolean;
}

export class Todo {
  title: string;
  rev: string;
  id: string;
  _id: string;
  _rev: string;
}
