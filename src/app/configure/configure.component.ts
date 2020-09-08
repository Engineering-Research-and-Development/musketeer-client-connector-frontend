import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService, CommsConfiguration, MMLLConfiguration } from '../utils/services/configuration.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { emergeAnimation } from '../utils/animations/emerge.animation';
import { flyInOutAnimation } from '../utils/animations/fly-in-out.animation';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss'],
  animations: [emergeAnimation, flyInOutAnimation]
})
export class ConfigureComponent implements OnInit {
  commsConfig: CommsConfiguration = new CommsConfiguration();
  mmllConfig: MMLLConfiguration = new MMLLConfiguration();
  catalogue: any[];

  downloading: boolean;
  progress: number = 0;
  currentStep: number = 0;

  sections: string[] = ['Communications', 'ML Library'];

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private configurationService: ConfigurationService
  ) { }

  ngOnInit() {
    let isConfigured = localStorage.getItem('configured');

    if (isConfigured) this.router.navigateByUrl('login');

    this.configurationService.checkIfConfigured()
      .subscribe({
        next: (res) => {
          if (res.step == -1) this.router.navigateByUrl('login');

          else this.currentStep = res.step - 1;
        },
        error: () => this.toaster.error('Could not check configuration')
      });
  }

  submitCommsConfig(config: CommsConfiguration) {
    this.downloading = true;
    this.commsConfig = config;

    this.configurationService.setCommsConfiguration(this.commsConfig)
      .subscribe({
        next: () => {
          this.downloading = false;
          this.currentStep = 1;
        },
        error: (err: HttpErrorResponse) => {
          this.downloading = false;
          this.toaster.error(err.error.message || 'Could not submit configuration.');
        }
      });
  }

  submitMMLLConfig(config: MMLLConfiguration) {
    this.downloading = true;
    this.mmllConfig = config;

    this.configurationService.setMMLLConfiguration(this.mmllConfig)
      .subscribe({
        next: () => {
          this.downloading = false;
          localStorage.setItem('configured', 'true');
          this.toaster.success('Configuration completed successfully!');
          this.router.navigateByUrl('login');
        },
        error: (err: HttpErrorResponse) => {
          this.downloading = false;
          this.toaster.error(err.error.message || 'Could not submit configuration.');
        }
      });
  }

}
