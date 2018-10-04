import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-api-immediate-conflict',
  templateUrl: './api-immediate-conflict.component.html',
  styleUrls: ['./api-immediate-conflict.component.css']
})
export class ApiImmediateConflictComponent extends BaseComponent implements OnInit {

  code = '';

  constructor(private codeService: CodeService) {
    super();
  }

  ngOnInit() {
    this.code = this.codeService.get('resolveImmediateConflict');
  }

}
