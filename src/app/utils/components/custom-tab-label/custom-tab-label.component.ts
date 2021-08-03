import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-tab-label',
  templateUrl: './custom-tab-label.component.html',
  styleUrls: ['./custom-tab-label.component.scss']
})
export class CustomTabLabelComponent implements OnInit {

  @ViewChild(TemplateRef, { static: false }) labelContent: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void { }

}
