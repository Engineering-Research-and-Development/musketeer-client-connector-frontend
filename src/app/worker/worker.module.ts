import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { DataConnectorComponent } from './data-connector/data-connector.component';
import { AlertModule, TooltipModule } from 'ngx-bootstrap';
import { UtilsModule } from '../utils/utils.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ DataConnectorComponent ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    UtilsModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot()
  ],
  exports: [ DataConnectorComponent ]
})
export class WorkerModule { }
