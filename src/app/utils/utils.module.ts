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
import { AlertModule, TooltipModule } from 'ngx-bootstrap';
import { DatasetItemComponent } from './components/dataset-item/dataset-item.component';
import { PrettyJsonPipe } from './pipes/pretty-json.pipe';
import { TaskStatusComponent } from './components/task-status/task-status.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { CustomTabsComponent } from './components/custom-tabs/custom-tabs.component';
import { CustomTabComponent } from './components/custom-tab/custom-tab.component';
import { CustomTabLabelComponent } from './components/custom-tab-label/custom-tab-label.component';
import { CustomTabPaneComponent } from './components/custom-tab-pane/custom-tab-pane.component';
import { RouterModule } from '@angular/router';
import { PropertiesEditorComponent } from './components/properties-editor/properties-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
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
    TaskStatusComponent,
    TasksTableComponent,
    ChangePasswordFormComponent,
    CustomTabsComponent,
    CustomTabComponent,
    CustomTabLabelComponent,
    CustomTabPaneComponent,
    PropertiesEditorComponent,
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
    TaskStatusComponent,
    TasksTableComponent,
    ChangePasswordFormComponent,
    CustomTabsComponent,
    CustomTabComponent,
    CustomTabLabelComponent,
    CustomTabPaneComponent,
    PropertiesEditorComponent,
  ]
})
export class UtilsModule { }