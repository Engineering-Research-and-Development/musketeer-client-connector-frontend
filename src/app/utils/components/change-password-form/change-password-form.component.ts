import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from 'src/app/settings/settings.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {
  newPassword: string;
  confirmPassword: string;

  constructor(
    private settingsService: SettingsService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
  }

  changePassword() {
    if(this.newPassword != this.confirmPassword) {
      this.toaster.error('Provided password must be equal.')
      return;
    }

    this.spinner.show();

    this.settingsService.changePassword(this.newPassword)
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

}
