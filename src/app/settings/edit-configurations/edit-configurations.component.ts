import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigurationService, CommsConfiguration, MMLLConfiguration } from 'src/app/utils/services/configuration.service';
import { forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-configurations',
  templateUrl: './edit-configurations.component.html',
  styleUrls: ['./edit-configurations.component.scss']
})
export class EditConfigurationsComponent implements OnInit {
  commsConfig: CommsConfiguration;
  mmllConfig: MMLLConfiguration;
  catalogueConfig: any[];
  downloading: boolean;

  @ViewChild('commsModal', { static: false }) commsModal: ModalDirective;
  @ViewChild('catalogueModal', { static: false }) catalogueModal: ModalDirective;

  constructor(
    private configurationsService: ConfigurationService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
    this.initConfigurations();
  }

  initConfigurations() {
    let comms = this.configurationsService.getCommsConfiguration();
    let mmll = this.configurationsService.getMMLLConfiguration();

    forkJoin([comms, mmll]).subscribe({
      next: (results) => {
        this.commsConfig = results[0]['configurations'];
        this.mmllConfig = results[1]['configurations'];
      },
      error: (err: HttpErrorResponse) => {
        this.toaster.error(err.error.message || 'Could not get configurations');
      }
    })
  }

  commsSettings(evt: MouseEvent) {
    evt.stopPropagation();
    this.commsModal.show();
  }

  catalogueSettings(evt: MouseEvent) {
    evt.stopPropagation();
    this.catalogueModal.show();
  }

  submitCommsConfig(config: CommsConfiguration) {
    this.downloading = true;
    this.commsConfig = config;

    this.configurationsService.setCommsConfiguration(this.commsConfig)
      .subscribe({
        next: () => this.downloading = false,
        error: (err: HttpErrorResponse) => {
          this.downloading = false;
          this.toaster.error(err.error.message || 'Could not submit configuration.');
        }
      });
  }

  submitMMLLConfig(config: MMLLConfiguration) {
    this.downloading = true;
    this.mmllConfig = config;

    this.configurationsService.setMMLLConfiguration(this.mmllConfig)
      .subscribe({
        next: () => this.downloading = false,
        error: (err: HttpErrorResponse) => {
          this.downloading = false;
          this.toaster.error(err.error.message || 'Could not submit configuration.');
        }
      });
  }


}
