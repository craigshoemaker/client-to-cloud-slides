import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-api-update',
  templateUrl: './api-update.component.html',
  styleUrls: ['./api-update.component.css']
})
export class ApiUpdateComponent extends BaseComponent implements OnInit {

  code = '';

  constructor(private codeService: CodeService) {
    super();
  }

  ngOnInit() {
    this.code = this.codeService.get('update');
  }

}
