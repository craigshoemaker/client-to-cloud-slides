import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
