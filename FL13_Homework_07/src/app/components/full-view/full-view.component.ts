import { Component, OnInit } from '@angular/core';

import { News } from '../../interfaces/News';

@Component({
  selector: 'app-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.css'],
})
export class FullViewComponent implements OnInit {
  newsDetail: News;

  constructor() {}

  ngOnInit(): void {}
}
