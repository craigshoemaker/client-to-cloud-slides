import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { ConfigService } from '../config.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-api-init',
  templateUrl: './api-init.component.html',
  styleUrls: ['./api-init.component.css']
})
export class ApiInitComponent implements OnInit {

  code = '';

  constructor(private codeService: CodeService,
              private config: ConfigService,
              private messenger: MessageService) {
    this.messenger.subscribe(this.messenger.events.config.loaded, () => {
      this.bind();
    });
    this.messenger.subscribe(this.messenger.events.config.remoteLocation.changed, () => {
      this.bind();
    });
  }

  ngOnInit() {}

  bind() {
    const replacements = [
      { pattern: 'databaseName', value: `'${this.config.databaseName}'` },
      { pattern: 'remoteURL', value: `'${this.config.getRemoteDatabaseURL()}'` }
    ];
    this.code = this.codeService.get('init', replacements);
  }

}
