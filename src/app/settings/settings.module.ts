import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditConfigurationsComponent } from './edit-configurations/edit-configurations.component';
import { FormsModule } from '@angular/forms';
import { AccordionModule, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { UtilsModule } from '../utils/utils.module';


@NgModule({
  declarations: [
    EditConfigurationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilsModule,
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    EditConfigurationsComponent
  ]
})
export class SettingsModule { }
