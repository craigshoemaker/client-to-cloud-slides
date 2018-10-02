import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-api-add',
  templateUrl: './api-add.component.html',
  styleUrls: ['./api-add.component.css']
})
export class ApiAddComponent extends BaseComponent implements OnInit {

  code = '';

  constructor(private codeService: CodeService) {
    super();
   }

  ngOnInit() {
    this.code = this.codeService.get('add');
  }

}
