import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-tab-pane',
  templateUrl: './custom-tab-pane.component.html',
  styleUrls: ['./custom-tab-pane.component.scss']
})
export class CustomTabPaneComponent implements OnInit {

  @ViewChild(TemplateRef, { static: false }) bodyContent: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void { }

}
