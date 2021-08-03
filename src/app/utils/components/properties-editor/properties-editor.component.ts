import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/model/algorithm';

@Component({
  selector: 'app-properties-editor',
  templateUrl: './properties-editor.component.html',
  styleUrls: ['./properties-editor.component.scss']
})
export class PropertiesEditorComponent implements OnInit {
  @Input() properties: Property[];
  @Input() propInputId: string = 'prop';
  @Input() propHelpId: string = 'propHelp';
  @Input() fullWidth: boolean;

  constructor() { }

  ngOnInit() {
  }

}
