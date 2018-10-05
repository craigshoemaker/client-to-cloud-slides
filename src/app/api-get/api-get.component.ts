import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-api-get',
  templateUrl: './api-get.component.html',
  styleUrls: ['./api-get.component.css']
})
export class ApiGetComponent extends BaseComponent implements OnInit {

  code = '';

  constructor(private codeService: CodeService) {
    super();
  }

  ngOnInit() {
    this.code = this.codeService.get('get');
  }

}
