import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {
  error: boolean;
  newPassword: string;
  confirmPassword: string;

  @Output() changePassword = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onChangePwd() {
    if (this.newPassword != this.confirmPassword) {
      this.error = true;
      return;
    }

    this.changePassword.emit(this.newPassword);
  }

}
