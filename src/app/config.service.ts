import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  databaseName = 'client-to-cloud';

  config: IConfiguration;
  code = [];

  location: string;

  constructor(private http: HttpClient, private messenger: MessageService) {
    this.config = new Configuration();

    this.http.get('/assets/secrets.json').subscribe(response => {
      this.config = Object.assign(this.config, response);
      this.messenger.broadcast(this.messenger.events.config.loaded);
    });
  }

  setRemoteLocation(remoteLocation: string) {
    this.location = remoteLocation;
    this.messenger.broadcast(this.messenger.events.config.remoteLocation.changed);
  }

  getRemoteHostURL() {
    return `http://${this.config[this.location].host}:${this.config[this.location].port}`;
  }

  getRemoteDatabaseURL() {
    return this.getRemoteHostURL() + '/' + this.databaseName;
  }

  getRemoteAdminURL() {
    return this.getRemoteHostURL() + '/_utils';
  }

  get(propName) {
    return this.config[this.location][propName];
  }

}

export interface IConfigurationItem {
  username: string;
  password: string;
  host: string;
  port: number;
}

export interface IConfiguration {
  local: IConfigurationItem;
  azure: IConfigurationItem;
}

export class Configuration implements IConfiguration {
  local: IConfigurationItem;
  azure: IConfigurationItem;
}
