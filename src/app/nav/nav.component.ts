import { Component, OnInit } from '@angular/core';
import { ConfigService, IConfigurationItem } from '../config.service';
import { MessageService } from '../message.service';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent extends BaseComponent implements IConfigurationItem {

  showConfig = false;

  username: string;
  password: string;
  host: string;
  port: number;
  adminURL: string;

  constructor(private config: ConfigService, private messenger: MessageService) {
    super();
    this.messenger.subscribe(this.messenger.events.config.loaded, () => {
      this.setConfig();
    });
  }

  setConfig(remoteLocation: string = 'local') {

    this.config.setRemoteLocation(remoteLocation);

    this.username = this.config.get('username');
    this.password = this.config.get('password');
    this.host = this.config.get('host');
    this.port = this.config.get('port');
    this.adminURL = this.config.getRemoteAdminURL();
  }

  toggleConfig() {
    this.showConfig = !this.showConfig;
  }

  sectionChanged(e) {
    const el = e.currentTarget;

    if (el.selectedIndex > 0 && el.selectedOptions[0].value.length > 0) {
      const id = el.selectedOptions[0].value;
      this.scrollToSection(document.getElementById(id));
      setTimeout(() => {
        el.selectedIndex = 0;
      }, 2000);
    }
  }

}
