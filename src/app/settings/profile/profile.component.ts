import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faExclamationTriangle, faKey, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faKey = faKey;
  faUserTimes = faUserTimes;
  faExclamationTriangle = faExclamationTriangle;

  constructor(
    private settingsService: SettingsService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  changePassword(newPassword: string) {
    this.spinner.show();

    this.settingsService.changePassword(newPassword)
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.toaster.success('Password updated successfully!');
        },
        error: (err: HttpErrorResponse) => {
          this.spinner.hide();
          this.toaster.error(err.error.message || 'Could not update password.');
        }
      })
  }

  deregisterAccount() {
    this.spinner.show();

    this.settingsService.deregisterAccount()
      .subscribe({
        next: () => {
          this.spinner.hide();

          this.toaster.success('Account deleted successfully');
          this.router.navigateByUrl('/login');
        },
        error: (err: HttpErrorResponse) => {
          this.spinner.hide();
          this.toaster.error('Could not delete account', 'Error!');
        }
      })
  }

}
