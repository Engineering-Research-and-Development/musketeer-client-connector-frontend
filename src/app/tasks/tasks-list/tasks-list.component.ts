import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { TasksService } from '../tasks.service';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap';

import * as _ from 'lodash';

import { ToastrService } from 'ngx-toastr';

import { TaskDefinition, TaskSpecification } from 'src/model/taskDefinitions';
import { HttpErrorResponse } from '@angular/common/http';
import { PrivacyLevel } from 'src/model/privacy';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TasksListComponent implements OnInit {
  tasks: TaskSpecification[];
  task: TaskSpecification;
  newTask: TaskSpecification = new TaskSpecification();

  createdTasks: TaskSpecification[];

  currentPageTasks: TaskSpecification[] = [];
  currentPage: number = 1;
  tasksPerPage: number = 25;

  modalRef: BsModalRef;

  search: string = '';
  status: string = 'All';
  sort: 'asc' | 'desc' = 'desc';

  privacy: number = 0;
  privacyLevels: PrivacyLevel[];

  @ViewChild('taskActionModal', { static: false }) taskActionModal: ModalDirective;
  @ViewChild('logsModal', { static: false }) logsModal: ModalDirective;
  @ViewChild('taskResultModal', { static: false }) taskResultModal: ModalDirective;

  constructor(
    private tasksService: TasksService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
    this.initPrivacyLevels();
    this.initTasks();
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

    this.tasksService.getCreatedTasks()
      .subscribe({
        next: (res: any[]) => {
          res.forEach(t => t.definition = <TaskDefinition>JSON.parse(t.definition));
          this.createdTasks = res;
          // this.updatePageTasks();
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.message || 'Could not retrieve tasks.');
          this.createdTasks = [];
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

  refresh() {
    this.tasks = null;
    this.initTasks();
  }
}
