import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-api-bulkdocs',
  templateUrl: './api-bulkdocs.component.html',
  styleUrls: ['./api-bulkdocs.component.css']
})
export class ApiBulkdocsComponent extends BaseComponent implements OnInit {

  code = '';

  constructor(private codeService: CodeService) {
    super();
  }

  ngOnInit() {
    this.code = this.codeService.get('resolveEventualConflict');
  }

}
