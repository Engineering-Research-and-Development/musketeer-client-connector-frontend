import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ModalDirective } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataFile, FileSpecs } from 'src/model/dataDefinitions';
import { DatasetsService } from '../datasets.service';

@Component({
  selector: 'app-datasets-list',
  templateUrl: './datasets-list.component.html',
  styleUrls: ['./datasets-list.component.scss']
})
export class DatasetsListComponent implements OnInit {
  @ViewChild('datasetEditModal', { static: false }) datasetEditModal: ModalDirective;
  @ViewChild('datasetDeleteModal', { static: false }) datasetDeleteModal: ModalDirective;

  newDataset: DataFile = new DataFile();
  dataset: DataFile;
  datasets: DataFile[];
  usedNames: string[] = [];

  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private datasetsService: DatasetsService,
  ) { }

  ngOnInit() {
    this.initDatasets();
  }

  initDatasets() {
    this.datasetsService.getDatasets()
      .subscribe({
        next: (res) => {
          this.datasets = res;
          this.usedNames = this.datasets.map(d => d.name);
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.nessage || 'Could not get datasets.');
          this.datasets = [];
        }
      });
  }

  refresh() {
    this.datasets = null;
    this.initDatasets();
  }

  deleteDatasetModal(dataset: DataFile) {
    this.dataset = dataset;
    this.datasetDeleteModal.show();
  }

  addDataset() {
    this.newDataset = new DataFile();
    this.datasetEditModal.show();
  }

  editDataset(dataset: DataFile) {
    this.newDataset = _.cloneDeep(dataset);
    this.datasetEditModal.show();
  }

  deleteDataset() {
    this.spinner.show();

    this.datasetsService.deleteDataset(this.dataset._id)
      .subscribe({
        next: () => {
          this.toaster.success('Dataset deleted successfully');
          this.datasetDeleteModal.hide();
          this.refresh();
          this.spinner.hide();
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.message || 'Could not delete dataset');
          this.spinner.hide();
        }
      })
  }

  submitDataset(newDataset: DataFile) {
    this.newDataset = newDataset;

    if (!this.newDataset._id && this.usedNames.includes(this.newDataset.name)) {
      this.toaster.warning('Dataset name already in use.');
      return;
    }

    this.spinner.show();

    if (this.newDataset._id) {
      this.datasetsService.updateDataset(this.newDataset)
        .subscribe({
          next: () => {
            this.toaster.success('Dataset updated successfully');
            this.datasetEditModal.hide();
            this.refresh();
            this.spinner.hide();
          },
          error: (err: HttpErrorResponse) => {
            this.toaster.error(err.error.message || 'Could not upload dataset');
            this.spinner.hide();
          }
        })
    }
    else {
      const dataset = new FileSpecs(this.newDataset);

      this.datasetsService.addDataset(dataset)
        .subscribe({
          next: () => {
            this.toaster.success('Dataset added successfully');
            this.datasetEditModal.hide();
            this.refresh();
            this.spinner.hide();
          },
          error: (err: HttpErrorResponse) => {
            this.toaster.error(err.error.message || 'Could not upload dataset');
            this.spinner.hide();
          }
        });
    }
  }

}
