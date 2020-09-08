import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WorkerService } from '../worker.service';
import { ToastrService } from 'ngx-toastr';
import { DataFile, FileSpecs } from 'src/model/dataDefinitions';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-data-connector',
  templateUrl: './data-connector.component.html',
  styleUrls: ['./data-connector.component.scss'],
})
export class DataConnectorComponent implements OnInit {
  newDataset: DataFile = new DataFile();
  datasets: DataFile[];

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private workerService: WorkerService,
  ) { }

  ngOnInit() {
    this.initDatasets();
  }

  initDatasets() {
    this.workerService.getDatasets()
      .subscribe({
        next: (res) => this.datasets = res['FileSystem'],
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

  submitDataset() {
    let dataset = new FileSpecs(this.newDataset);

    this.spinner.show();

    this.workerService.addDataset(dataset)
      .subscribe({
        next: () => {
          // this.router.navigateByUrl('tasks');
          this.toaster.success('Dataset added successfully');
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
