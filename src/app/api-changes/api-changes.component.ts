import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-api-changes',
  templateUrl: './api-changes.component.html',
  styleUrls: ['./api-changes.component.css']
})
export class ApiChangesComponent extends BaseComponent implements OnInit {

  code = '';

  constructor(private codeService: CodeService) {
    super();
  }

  ngOnInit() {
    this.code = this.codeService.get('listenForChanges');
  }

}
