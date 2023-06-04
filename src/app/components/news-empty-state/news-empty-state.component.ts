import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-empty-state',
  templateUrl: './news-empty-state.component.html',
  styleUrls: ['./news-empty-state.component.scss'],
})
export class NewsEmptyStateComponent implements OnInit {
  
  @Input('title') title: any;
  @Input('subtitle') subtitle: any;

  constructor() { }

  ngOnInit() {}

}
