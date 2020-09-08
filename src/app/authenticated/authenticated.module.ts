import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthenticatedComponent } from './authenticated.component';
import { TasksModule } from '../tasks/tasks.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WorkerModule } from '../worker/worker.module';
import { SettingsModule } from '../settings/settings.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AuthenticatedComponent],
  imports: [
    CommonModule,
    TasksModule,
    WorkerModule,
    SettingsModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    AuthenticatedRoutingModule
  ]
})
export class AuthenticatedModule { }
