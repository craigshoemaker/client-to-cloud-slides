import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-api-alldocs',
  templateUrl: './api-alldocs.component.html',
  styleUrls: ['./api-alldocs.component.css']
})
export class ApiAlldocsComponent extends BaseComponent implements OnInit {

  code = '';

  constructor(private codeService: CodeService) {
    super();
  }

  ngOnInit() {
    this.code = this.codeService.get('getAll');
  }

}
