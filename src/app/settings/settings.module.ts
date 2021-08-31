import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditConfigurationsComponent } from './edit-configurations/edit-configurations.component';
import { FormsModule } from '@angular/forms';
import { AccordionModule, AlertModule, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { UtilsModule } from '../utils/utils.module';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    EditConfigurationsComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    UtilsModule,
    AlertModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    EditConfigurationsComponent
  ]
})
export class SettingsModule { }
