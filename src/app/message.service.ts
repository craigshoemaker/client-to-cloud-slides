import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';


interface IMessage {
  type: string;
  payload: any;
}

type MessageCallback = (payload: any) => void;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  events = {
    config: {
      loaded: 'config.loaded',
      remoteLocation: {
        changed: 'config.remoteLocation.changed'
      }
    },
    database: {
      initialized: 'database.initialzed',
      changed: {
        remoteSource: 'database.changed.remoteSource',
        local: 'database.changed.local',
        remote: 'database.changed.remote',
        at: source => `database.changed.${source}`
      }
    },
    todo: {
      new: 'todo.new'
    },
    data: {
      todo: {
        get: 'data.todo.get',
        conflicts: 'data.todo.conflicts'
      },
      generalError: 'data.general.error',
      sync: {
        started: 'data.sync.started',
        completed: 'data.sync.completed',
        paused: 'data.sync.paused',
        changed: 'data.sync.changed'
      },
      conflict: {
        local: 'data.conflict.local',
        remote: 'data.conflict.remote',
        resolved: 'data.conflict.resolved',
        at: source => `data.conflict.${source}`
      }
    }
  };

  private handler = new Subject<IMessage>();

  broadcast(type: string, payload?: any) {
    this.handler.next({ type, payload });
  }

  subscribe(type: string, callback: MessageCallback): Subscription {
    return this.handler
      .pipe(filter(message => message.type === type))
      .pipe(map(message => message.payload))
      .subscribe(callback);
  }
}
