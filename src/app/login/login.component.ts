import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/model/user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import * as $ from 'jquery';
import { timer } from 'rxjs';
import { loginSwapAnimation } from '../utils/animations/login-swap.animation';
import { ConfigurationService } from '../utils/services/configuration.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [loginSwapAnimation]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  register: boolean;
  confirmErr: boolean;
  confirmPassword: string;

  imageUrl: string;

  constructor(
    private configurationService: ConfigurationService,
    private authenticationService: AuthService,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    let isConfigured = localStorage.getItem('configured');
    if(!isConfigured) {
      this.configurationService.checkIfConfigured()
      .subscribe({
        next: (res) => {
          let step = res.step;

          if(step != -1) {
            this.router.navigateByUrl('configure');
            this.toaster.warning('Some required configurations are missing!');
          }
        },
        error: () => {
          this.toaster.error('Could not check configuration');
          this.router.navigateByUrl('configure');
        }
      })
    }

    this.imageUrl = `${environment.IMAGES_URL}/musketeer-high-res.jpg`;
  }

  confirm() {
    this.register ? this.registration() : this.login();
  }

  registration() {    
    if(this.user.password != this.confirmPassword) {
      this.confirmErr = true;
      return;
    }

    this.spinner.show();

    this.authenticationService.register(this.user)
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.toaster.success('Registration successful');
          this.toggleRegistration();
        },
        error: (err: HttpErrorResponse) => {
          this.spinner.hide();
          this.toaster.error('Could not complete registration.')
        }
      });
  }

  login() {
    this.spinner.show();

    this.authenticationService.login(this.user)
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.cookieService.set('user', JSON.stringify(this.user), 1, '/', '', false, "Strict");
          this.router.navigateByUrl('tasks');
        },
        error: (err: HttpErrorResponse) => {
          this.spinner.hide();
          this.toaster.error('Wrong user or password.')
        }
      });
  }
  
  toggleRegistration() {
    let end = timer(800);
    let half = timer(400);
    $('.tab').addClass('animate');
    $('.tab.active').addClass('animate');
    $('.login-card').addClass('animate');

    half.subscribe(() => this.register = !this.register);

    end.subscribe(() => {
      $('.tab').removeClass('animate');
      $('.login-card').removeClass('animate');
      // this.setHeight();
    });
  }

}
