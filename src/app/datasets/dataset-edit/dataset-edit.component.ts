import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataFile } from 'src/model/dataDefinitions';

@Component({
  selector: 'app-dataset-edit',
  templateUrl: './dataset-edit.component.html',
  styleUrls: ['./dataset-edit.component.scss']
})
export class DatasetEditComponent implements OnInit {
  @Input() newDataset: DataFile;

  @Output() submitDataset = new EventEmitter<DataFile>();
  @Output() cancel = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
