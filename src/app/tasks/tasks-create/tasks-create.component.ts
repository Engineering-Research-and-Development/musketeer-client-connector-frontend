import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { TasksService } from '../tasks.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskSpecification } from 'src/model/taskDefinitions';
import { Algorithm } from 'src/model/algorithm';
import { User } from 'src/model/user';
import * as _ from 'lodash';
import { PrivacyLevel, Privacy } from 'src/model/privacy';

import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ['./tasks-create.component.scss']
})
export class TasksCreateComponent implements OnInit {
  newTask: TaskSpecification = new TaskSpecification();

  selectedAlg: number = undefined;
  algorithms: Algorithm[];
  algModel: Algorithm;

  algorithm: Algorithm;

  preprocessingAlgos: Algorithm[];

  inputDataDescription: string;
  targetDataDescription: string;
  disconnectBadWorkers: false;

  privacyLevels: PrivacyLevel[];
  privacyLevel: PrivacyLevel;

  user: User;
  showPreprocessing: boolean = true;

  @ViewChild('propertiesModal', { static: false }) propertiesModal: ModalDirective;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private authService: AuthService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.initPrivacyLevels();
    this.initAlgorithms();

    this.user = this.authService.getUser();
  }

  initPrivacyLevels() {
    this.tasksService.getPrivacyLevels()
      .subscribe({
        next: (res: PrivacyLevel[]) => {
          this.privacyLevels = res['poms'];
          this.privacyLevel = this.privacyLevels.find(lvl => lvl.privacy == this.newTask.definition.POM);
        },
        error: (err: HttpErrorResponse) => this.toaster.error('Could not get POMs.')
      });
  }

  initAlgorithms() {
    this.tasksService.getSupportedAlgorithms()
      .subscribe({
        next: (res: any[]) => {
          this.algorithms = res['algorithms'];
          this.preprocessingAlgos = this.algorithms.filter(algo => algo.type == 'preprocessing');
        },
        error: (err: HttpErrorResponse) => this.toaster.error('Could not get algorithms.')
      })
  }

  updatePrivacy(evt: Privacy) {
    this.newTask.definition.POM = evt;
    this.privacyLevel = this.privacyLevels.find(lvl => lvl.privacy == evt);
    this.updateAlgorithm(undefined);
  }

  updateAlgorithm(evt: number) {
    this.selectedAlg = evt; // algorithm id
    this.algModel = this.algorithms.find(alg => alg.id == evt);
    console.log(this.algModel);
  }

  get pomAlgorithms() {
    return this.algorithms ? this.algorithms.filter(alg => alg.POM == this.newTask.definition.POM) : [];
  }

  get isSupervised() {
    return this.algModel ? (this.algModel.type == 'classification' || this.algModel.type == 'regression') : false;
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  openAlgModal(alg: Algorithm) {
    this.algorithm = alg;
    this.propertiesModal.show();
  }

  create() {
    const task: TaskSpecification = _.cloneDeep(this.newTask);

    task.definition.owner = this.user.user;
    task.definition.algorithm_name = this.algModel.name;
    task.definition.algorithm_type = this.algModel.type;

    this.algModel.properties.forEach(property => {
      let valueToAssign = property.value ? property.value : property.defaultValue;
      task.definition[property.name] = property.type == 'number' ? +valueToAssign : valueToAssign;
    });

    this.spinner.show();

    this.tasksService.createTask(task)
      .subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.router.navigateByUrl('/tasks');
          this.toaster.success('Task created successfully.')
        },
        error: (err: HttpErrorResponse) => {
          this.spinner.hide();
          this.toaster.error(err.error.message || 'Could not create task.');
        }
      })
  }

}
