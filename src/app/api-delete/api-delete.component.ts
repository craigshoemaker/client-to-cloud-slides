import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-api-delete',
  templateUrl: './api-delete.component.html',
  styleUrls: ['./api-delete.component.css']
})
export class ApiDeleteComponent extends BaseComponent implements OnInit {

  code = '';

  constructor(private codeService: CodeService) {
    super();
  }

  ngOnInit() {
    this.code = this.codeService.get('delete');
  }

}
