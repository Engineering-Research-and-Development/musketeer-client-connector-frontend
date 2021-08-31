import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChartBar, faNetworkWired, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { TaskSpecification } from 'src/model/taskDefinitions';
import { TasksService } from '../tasks.service';
import { DataFile, Datasets } from 'src/model/dataDefinitions';
import { FileSpecs } from 'src/model/dataDefinitions';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatasetsService } from 'src/app/datasets/datasets.service';
import { ModalDirective } from 'ngx-bootstrap';
import { User } from 'src/model/user';
import { AuthService } from 'src/app/auth/auth.service';
import { Task } from 'src/model/task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  task: TaskSpecification;
  task_name: string;
  error: boolean;
  selectedDataDescription: any;

  faUserPlus = faUserPlus;
  faNetworkWired = faNetworkWired;
  faChartBar = faChartBar;

  files: DataFile[];
  selectedFile: DataFile;
  newFile: DataFile = new DataFile();

  datasets: Datasets = new Datasets();

  aggregation: boolean;
  imageUrl: string | ArrayBuffer;

  source: EventSource;
  logs: string;
  logsError: boolean;

  user: User;

  @ViewChild('taskResultModal', { static: false }) taskResultModal: ModalDirective;
  @ViewChild('taskActionModal', { static: false }) taskActionModal: ModalDirective;
  @ViewChild('deleteModal', { static: false }) deleteModal: ModalDirective;
  @ViewChild('logsModal', { static: false }) logsModal: ModalDirective;
  @ViewChild('dataDescriptionModal', { static: false }) dataDescriptionModal: ModalDirective;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private datasetsService: DatasetsService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initTask();
    this.initFiles();
    this.user = this.authService.getUser();
  }

  ngAfterViewInit() {
    this.logsModal.onHidden.subscribe(() => {
      this.freeEventSource();
      this.logs = null;
    });
  }

  initTask() {
    this.task_name = this.route.snapshot.params.task_name;

    this.tasksService.getTask(this.task_name)
      .subscribe({
        next: (res) => {
          // const task = res;
          // task.definition = JSON.parse(task.definition.toString());
          this.task = res;
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.message || 'Could not get task.');
          this.error = true;
        }
      })
  }

  freeEventSource() {
    if (this.source) this.source.close();
  }

  initFiles() {
    this.datasetsService.getDatasets()
      .subscribe({
        next: (res: any) => this.files = res,
        error: (err: HttpErrorResponse) => this.toaster.error(err.message)
      });
  }

  openDataDescriptionModal(targetData?: boolean) {
    const dataDescription = targetData
      ? this.task.definition.target_data_description
      : this.task.definition.input_data_description;

    this.selectedDataDescription = JSON.parse(dataDescription.replace(/\'/g, '"'));
    this.dataDescriptionModal.show();
  }

  taskResult() {
    this.spinner.show();

    this.tasksService.getTaskResultImage(this.task.task_name)
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          // this.imageUrl = res['url'];
          this.createImageFromBlob(res);
          this.taskResultModal.show();
        },
        error: (err: HttpErrorResponse) => {
          this.spinner.hide();
          this.toaster.error(`Could not load task result (${err.status})`)
        }
      });
  }

  createImageFromBlob(image: Blob) {
    // console.log("Call createImageFromBlob()", image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageUrl = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  taskAction(aggregate: boolean) {
    this.aggregation = aggregate;
    this.taskActionModal.show();
  }

  getLogs() {
    let mode = this.task.definition.owner == this.user.user ? 'aggregator' : 'participant';
    this.logsModal.show();

    this.source = this.tasksService.getStreamLogs(this.task.task_name, mode);

    this.source.addEventListener('message', (message) => {
      let msg = JSON.parse(message['data']);
      this.logs ? this.logs += msg.line : this.logs = msg.line;
    });

    this.source.addEventListener('error', (err) => {
      this.freeEventSource();
      if (err['data']) {
        let error = JSON.parse(err['data']);

        if (this.logs) {
          this.logs += error.message;
        }
        else {
          this.logs = error.message;
          this.logsError = true;
        }
        this.toaster.error('Error while retrieving logs');
      }
    });
  }

  addDataset() {
    if (!this.newFile.name || !this.newFile.path) {
      this.toaster.error('Fill in the required fields first.');
      return;
    }

    let file = new FileSpecs(this.newFile);

    this.datasetsService.addDataset(file)
      .subscribe({
        next: () => {
          this.files = null;
          this.initFiles();
          this.newFile = new DataFile();
        },
        error: (err: HttpErrorResponse) => this.toaster.error(err.error.message || 'Could not upload file.')
      });
  }

  start() {
    let name = this.task.task_name;
    this.aggregation ? this.aggregate(name) : this.participate(name);
  }

  aggregate(task: string) {

    if (!this.datasets.test || !this.datasets.validation) {
      this.toaster.warning('You must provide a test and a validation dataset to aggregate!');
      return;
    }

    this.spinner.show();

    this.tasksService.aggregate(task, this.datasets)
      .subscribe({
        next: (res: any) => {
          this.refresh();
          this.spinner.hide();
          this.taskActionModal.hide();
          this.datasets = new Datasets();
          this.toaster.success(res.message || 'Task aggregation started successfully.')
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.message || 'Could not start aggregation.');
          this.spinner.hide();
        }
      });
  }

  refresh() {
    this.task = null;
    this.initTask();
  }

  // leave(task: Task) {
  //   task = _.cloneDeep(task);
  //   task.participants = task.participants.filter(p => p != 'You');

  //   this.tasksService.updateTask(task)
  //     .subscribe({
  //       next: (res: Task) => this.refresh(),
  //       error: () => this.toaster.error('Could not leave task.')
  //     });
  // }

  participate(task: string) {

    if (!this.datasets.training) {
      this.toaster.warning('You must provide at least a dataset for training to participate.');
      return;
    }

    this.spinner.show();

    this.tasksService.participate(task, this.datasets)
      .subscribe({
        next: (res: any) => {
          this.refresh();
          this.spinner.hide();
          this.taskActionModal.hide();
          this.datasets = new Datasets();
          this.toaster.success(res.message || 'Worker started successfully.');
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.message || 'Could not start worker.');
          this.spinner.hide();
        }
      });
  }

  deleteTask(task: TaskSpecification) {
    this.spinner.show();

    this.tasksService.deleteTask(task.task_name)
      .subscribe({
        next: (res: Task) => {
          this.spinner.hide();
          this.deleteModal.hide();
          this.router.navigateByUrl('/tasks');
        },
        error: () => {
          this.spinner.hide();
          this.toaster.error('Could not delete task.');
        }
      });
  }

  ngOnDestroy() {
    this.freeEventSource();
  }

}
