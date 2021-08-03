import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TasksListComponent } from './tasks-list/tasks-list.component';

import { AccordionModule, ModalModule, TooltipModule, AlertModule, PaginationModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { TasksCreateComponent } from './tasks-create/tasks-create.component';
import { UtilsModule } from '../utils/utils.module';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { NgDragDropModule } from 'ng-drag-drop';
import { TaskDetailComponent } from '../tasks/task-detail/task-detail.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ TasksListComponent, TasksCreateComponent, TaskDetailComponent ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    UtilsModule,
    DragDropModule,
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    NgDragDropModule.forRoot(),
    ToastrModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [ TasksListComponent, TasksCreateComponent ]
})
export class TasksModule { }
