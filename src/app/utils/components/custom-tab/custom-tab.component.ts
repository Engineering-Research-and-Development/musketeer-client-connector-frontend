import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { CustomTabLabelComponent } from '../custom-tab-label/custom-tab-label.component';
import { CustomTabPaneComponent } from '../custom-tab-pane/custom-tab-pane.component';

@Component({
  selector: 'app-custom-tab',
  templateUrl: './custom-tab.component.html',
  styleUrls: ['./custom-tab.component.scss']
})
export class CustomTabComponent implements OnInit {

  @Input() label: string;

  @Input() isActive: boolean;

  @ContentChild(CustomTabPaneComponent, { static: false }) bodyComponent: CustomTabPaneComponent;

  @ContentChild(CustomTabLabelComponent, { static: false }) labelComponent: CustomTabLabelComponent;

  constructor() { }

  ngOnInit() {
  }

}
