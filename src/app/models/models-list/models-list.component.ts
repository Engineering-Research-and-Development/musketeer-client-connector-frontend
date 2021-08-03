import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Model } from 'src/model/model';
import { ModelsService } from '../models.service';

@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss']
})
export class ModelsListComponent implements OnInit, AfterViewInit {
  models: Model[];
  model: Model;
  modelLineage: any;
  downloadExtension: 'pmml' | 'pkl' | 'onnx' = 'pkl';

  search: string;

  @ViewChild('modelLineageModal', { static: false }) modelLineageModal: ModalDirective;
  @ViewChild('modelDeleteModal', { static: false }) modelDeleteModal: ModalDirective;
  @ViewChild('downloadModal', { static: false }) downloadModal: ModalDirective;

  constructor(
    private modelsService: ModelsService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.initModels();
  }

  ngAfterViewInit() {
    this.modelDeleteModal.onHidden.subscribe(() => this.model = null);
    this.modelLineageModal.onHidden.subscribe(() => {
      this.model = null;
      this.modelLineage = null;
    });
  }

  initModels() {
    this.modelsService.getModels()
      .subscribe({
        next: (res) => {
          this.models = res;
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.message || 'Could not get models.');
          this.models = [];
        }
      })
  }

  openModelLineage(model: any) {
    this.model = model;
    this.modelLineageModal.show();

    this.modelsService.getModelLineage(model.task_name)
      .subscribe({
        next: (res: any) => {
          this.modelLineage = res[0];
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.message || 'Could not get model lineage.');
          this.modelLineage = {
            error: true,
            message: err.error.message,
          };
        }
      });
  }

  downloadModel() {
    this.spinner.show();

    this.modelsService.downloadModel(this.model.task_name, this.downloadExtension)
      .subscribe({
        next: (res) => {
          this.toaster.success(res.message || 'Model has been downloaded in your file system.');
          this.model = null;
          this.modelDeleteModal.hide();
          this.spinner.hide();
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.message || 'Could not download model.');
          this.spinner.hide();
        }
      });
  }

  openDownloadModal(model: Model) {
    this.model = model;
    this.downloadModal.show();
  }

  deleteModal(model: Model) {
    this.model = model;
    this.modelDeleteModal.show();
  }

  deleteModel() {
    this.spinner.show();

    this.modelsService.deleteModel(this.model.task_name)
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.model = null;
          this.modelDeleteModal.hide();
          this.models = null;
          this.initModels();
        },
        error: (err: HttpErrorResponse) => {
          this.spinner.hide();
          this.toaster.error(err.error.message || 'Could not delete model.');
        }
      })
  }

}
