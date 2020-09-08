import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { TasksService, LogsWrapper } from '../tasks.service';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap';
import { Task } from 'src/model/task';

import { faUserPlus, faUserTimes, faUserFriends, faEdit, faNetworkWired, faStopwatch, faKey, faChartBar } from '@fortawesome/free-solid-svg-icons';

import * as _ from 'lodash';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { TaskDefinition, TaskSpecification } from 'src/model/taskDefinitions';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/model/user';
import { WorkerService } from 'src/app/worker/worker.service';
import { PrivacyLevel } from 'src/model/privacy';
import { DataFile, Datasets } from 'src/model/dataDefinitions';
import { FileSpecs } from 'src/model/dataDefinitions';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TasksListComponent implements OnInit, OnDestroy, AfterViewInit {
  tasks: TaskSpecification[];
  task: TaskSpecification;
  newTask: TaskSpecification = new TaskSpecification();

  currentPageTasks: TaskSpecification[] = [];
  currentPage: number = 1;
  tasksPerPage: number = 10;

  logs: string;

  modalRef: BsModalRef;

  search: string = '';
  status: string = 'All';
  sort: 'asc' | 'desc' = 'desc';

  privacy: number = 0;
  privacyLevels: PrivacyLevel[];

  aggregation: boolean;
  imageUrl: string | ArrayBuffer;

  user: User;

  files: DataFile[];
  selectedFile: DataFile;
  newFile: DataFile = new DataFile();

  datasets: Datasets = new Datasets();

  faUserPlus = faUserPlus;
  faUserFriends = faUserFriends;
  faUserTimes = faUserTimes;
  faEdit = faEdit;
  faStopwatch = faStopwatch;
  faNetworkWired = faNetworkWired;
  faKey = faKey;
  faChartBar = faChartBar;

  source: EventSource;

  @ViewChild('taskActionModal', { static: false }) taskActionModal: ModalDirective;
  @ViewChild('logsModal', { static: false }) logsModal: ModalDirective;
  @ViewChild('taskResultModal', { static: false }) taskResultModal: ModalDirective;

  constructor(
    private tasksService: TasksService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private authService: AuthService,
    private workerService: WorkerService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.initPrivacyLevels();
    this.initTasks();
    this.initFiles();

    this.user = this.authService.getUser();
  }

  ngAfterViewInit() {
    this.logsModal.onHidden.subscribe(() => {
      this.freeEventSource();
      this.task = null;
      this.logs = null;
    });
  }

  freeEventSource() {
    if (this.source) this.source.close();
  }

  initFiles() {
    this.workerService.getDatasets()
      .subscribe({
        next: (res: any) => this.files = res['FileSystem'],
        error: (err: HttpErrorResponse) => this.toaster.error(err.message)
      });
  }

  taskResult(name: string) {
    this.spinner.show();

    this.tasksService.getTaskResultImage(name)
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

  taskAction(task: TaskSpecification, aggregate: boolean) {
    this.task = task;
    this.aggregation = aggregate;
    this.taskActionModal.show();
  }

  initPrivacyLevels() {
    this.tasksService.getPrivacyLevels()
      .subscribe({
        next: (res: PrivacyLevel[]) => {
          this.privacyLevels = res['poms'];
        },
        error: (err: HttpErrorResponse) => this.toaster.error(err.error.message || 'Could not get POMs.')
      });
  }

  initTasks() {
    this.tasksService.getTasks()
      .subscribe({
        next: (res: any[]) => {
          res.forEach(t => t.definition = <TaskDefinition>JSON.parse(t.definition));
          this.tasks = res;
          this.updatePageTasks();
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.message || 'Could not retrieve tasks.');
          this.tasks = [];
        }
      });
  }

  updatePageTasks(event?: number) {
    let search = this.search.toLowerCase();
    let logic = this.sort;

    if (event) this.currentPage = event;

    const startItem = (this.currentPage - 1) * this.tasksPerPage;
    const endItem = this.currentPage * this.tasksPerPage;

    this.currentPageTasks = this.tasks
      .filter(t => {
        let privacy = this.privacy == 0
          ? true
          : t.definition.POM == this.privacy;
        let status = this.status == 'All'
          ? true
          : t.status == this.status;

        return t.task_name.toLowerCase().includes(search.toLowerCase()) && privacy && status
      })
      .sort((a, b) => {
        let result = Date.parse(a.added) - Date.parse(b.added);
        return logic == 'asc' ? result : -result;
      })
      .slice(startItem, endItem);
  }

  toggleSort() {
    this.sort = this.sort == 'asc' ? 'desc' : 'asc';
    this.updatePageTasks();
  }

  openModal(template: TemplateRef<any>, task: TaskSpecification) {
    this.task = task;
    this.modalRef = this.modalService.show(template);
  }

  getLogs(task: TaskSpecification) {
    let mode = task.definition.owner == this.user.user ? 'aggregator' : 'participant';
    this.logsModal.show();
    this.task = task;

    this.source = this.tasksService.getStreamLogs(task.task_name, mode);

    this.source.addEventListener('message', (message) => {
      let msg = JSON.parse(message['data']);
      this.logs ? this.logs += msg.line : this.logs = msg.line;
    });

    this.source.addEventListener('error', (err) => {
      this.freeEventSource();
      if(err['data']) {
        let error = JSON.parse(err['data']);
        this.logs ? this.logs += error.message : this.logs = error.message;
        this.toaster.error('Error while retrieving logs');
      }
    });
  }

  refresh() {
    this.tasks = null;
    this.initTasks();
  }

  addDataset() {
    if (!this.newFile.name || !this.newFile.path) {
      this.toaster.error('Fill in the required fields first.');
      return;
    }

    let file = new FileSpecs(this.newFile);

    this.workerService.addDataset(file)
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

  leave(task: Task) {
    task = _.cloneDeep(task);
    task.participants = task.participants.filter(p => p != 'You');

    this.tasksService.updateTask(task)
      .subscribe({
        next: (res: Task) => this.refresh(),
        error: () => this.toaster.error('Could not leave task.')
      });
  }

  delete(task: TaskSpecification) {
    this.tasksService.deleteTask(task.task_name)
      .subscribe({
        next: (res: Task) => {
          this.modalRef.hide();
          this.refresh()
        },
        error: () => this.toaster.error('Could not delete task.')
      });
  }

  ngOnDestroy() {
    this.freeEventSource();
  }

}
