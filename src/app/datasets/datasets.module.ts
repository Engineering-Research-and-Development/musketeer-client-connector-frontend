import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetsListComponent } from './datasets-list/datasets-list.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { AlertModule, ModalModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DatasetEditComponent } from './dataset-edit/dataset-edit.component';



@NgModule({
  declarations: [DatasetsListComponent, DatasetEditComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    UtilsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot()
  ]
})
export class DatasetsModule { }
