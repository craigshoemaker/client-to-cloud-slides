import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-api-sync',
  templateUrl: './api-sync.component.html',
  styleUrls: ['./api-sync.component.css']
})
export class ApiSyncComponent extends BaseComponent implements OnInit {

  code = '';

  constructor(private codeService: CodeService) {
    super();
   }

  ngOnInit() {
    let code = this.codeService.get('sync');
    code = code.replace(/e \=\>\)/g, 'e => console.log)');
    this.code = code;
  }

}
