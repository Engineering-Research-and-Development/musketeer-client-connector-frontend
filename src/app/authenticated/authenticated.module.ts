import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthenticatedComponent } from './authenticated.component';
import { TasksModule } from '../tasks/tasks.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SettingsModule } from '../settings/settings.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DatasetsModule } from '../datasets/datasets.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModelsModule } from '../models/models.module';
import { CollapseModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [AuthenticatedComponent],
  imports: [
    CommonModule,
    TasksModule,
    DatasetsModule,
    ModelsModule,
    SettingsModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    AuthenticatedRoutingModule
  ]
})
export class AuthenticatedModule { }
