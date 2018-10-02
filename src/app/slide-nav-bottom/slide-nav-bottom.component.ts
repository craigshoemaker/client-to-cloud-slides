import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-slide-nav-bottom',
  templateUrl: './slide-nav-bottom.component.html',
  styleUrls: ['./slide-nav-bottom.component.css']
})
export class SlideNavBottomComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
