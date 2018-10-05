import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-slide-anatomy',
  templateUrl: './slide-anatomy.component.html',
  styleUrls: ['./slide-anatomy.component.css']
})
export class SlideAnatomyComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
