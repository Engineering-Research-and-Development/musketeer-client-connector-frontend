import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataFile } from 'src/model/dataDefinitions';

@Component({
  selector: 'app-dataset-item',
  templateUrl: './dataset-item.component.html',
  styleUrls: ['./dataset-item.component.scss']
})
export class DatasetItemComponent implements OnInit {
  @Input() readOnly: boolean;
  @Input() editable: boolean;
  @Input() selected: boolean;
  @Input() dataset: DataFile;
  @Output() datasetSelected = new EventEmitter<DataFile>();
  @Output() edit = new EventEmitter<DataFile>();
  @Output() deleted = new EventEmitter<DataFile>();

  constructor() { }

  ngOnInit() {
  }

}
