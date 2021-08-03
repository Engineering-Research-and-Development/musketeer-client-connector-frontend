import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsListComponent } from './models-list/models-list.component';
import { AlertModule, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { UtilsModule } from '../utils/utils.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModelsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UtilsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
  ]
})
export class ModelsModule { }
