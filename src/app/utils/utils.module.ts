import { NgModule } from '@angular/core';
import { ObjectKeysPipe } from './pipes/object-keys.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { BytesPipe } from './pipes/bytes.pipe';
import { RatingComponent } from './components/rating/rating.component';
import { CommonModule } from '@angular/common';
import { RadioButtonsComponent } from './components/radio-buttons/radio-buttons.component';
import { LoaderComponent } from './components/loader/loader.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { MmllConfigFormComponent } from './components/mmll-config-form/mmll-config-form.component';
import { FormsModule } from '@angular/forms';
import { CommsConfigFormComponent } from './components/comms-config-form/comms-config-form.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { TooltipModule } from 'ngx-bootstrap';
import { DatasetItemComponent } from './components/dataset-item/dataset-item.component';
import { PrettyJsonPipe } from './pipes/pretty-json.pipe';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { TaskStatusIconComponent } from './components/task-status-icon/task-status-icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      FontAwesomeModule,
      TooltipModule.forRoot(),
  ],
  declarations: [
      ObjectKeysPipe,
      SortByPipe,
      FilterByPipe,
      BytesPipe,
      PrettyJsonPipe,
      RatingComponent,
      RadioButtonsComponent,
      LoaderComponent,
      StepperComponent,
      MmllConfigFormComponent,
      CommsConfigFormComponent,
      FileUploadComponent,
      DatasetItemComponent,
      StatusBadgeComponent,
      TaskStatusIconComponent,
  ],
  exports: [
    ObjectKeysPipe,
    SortByPipe,
    FilterByPipe,
    BytesPipe,
    PrettyJsonPipe,
    RatingComponent,
    LoaderComponent,
    StepperComponent,
    RadioButtonsComponent,
    MmllConfigFormComponent,
    CommsConfigFormComponent,
    FileUploadComponent,
    DatasetItemComponent,
    StatusBadgeComponent,
    TaskStatusIconComponent
  ]
})
export class UtilsModule { }