import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-api-get',
  templateUrl: './api-get.component.html',
  styleUrls: ['./api-get.component.css']
})
export class ApiGetComponent implements OnInit {

  code = '';

  constructor(private codeService: CodeService) { }

  ngOnInit() {
    this.code = this.codeService.get('get');
  }

}
