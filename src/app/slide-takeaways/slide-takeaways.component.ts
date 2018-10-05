import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-slide-takeaways',
  templateUrl: './slide-takeaways.component.html',
  styleUrls: ['./slide-takeaways.component.css']
})
export class SlideTakeawaysComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() { }

}
