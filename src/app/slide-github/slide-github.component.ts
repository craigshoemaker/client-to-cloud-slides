import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-slide-github',
  templateUrl: './slide-github.component.html',
  styleUrls: ['./slide-github.component.css']
})
export class SlideGithubComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
