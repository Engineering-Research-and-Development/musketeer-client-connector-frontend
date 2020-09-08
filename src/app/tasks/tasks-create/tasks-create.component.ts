import { Component, OnInit } from '@angular/core';
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

  privacyLevels: PrivacyLevel[];
  privacyLevel: PrivacyLevel;

  user: User;

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
        next: (res: any[]) => this.algorithms = res['algorithms'],
        error: (err: HttpErrorResponse) => this.toaster.error('Could not get algorithms.')
      })    
  }

  updatePrivacy(evt: Privacy) {
    this.newTask.definition.POM = evt;
    this.privacyLevel = this.privacyLevels.find(lvl => lvl.privacy == evt);
  }

  updateAlgorithm(evt: number) {
    this.selectedAlg = evt; // algorithm id
    this.algModel = this.algorithms.find(alg => alg.id == evt);
  }

  get pomAlgorithms() {
    return this.algorithms ? this.algorithms.filter(alg => alg.POM == this.newTask.definition.POM) : [];
  }

  create() {
    let task: TaskSpecification = _.cloneDeep(this.newTask);
    
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
