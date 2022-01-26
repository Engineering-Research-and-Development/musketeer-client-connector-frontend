import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/model/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { interval, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { SettingsService } from '../settings/settings.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {
  user: User;
  logoUrl: string;
  isCollapsed: boolean = true;
  faUserCog = faUserCog;

  subscription$: Subscription;

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private toaster: ToastrService,
    public router: Router,
    private settingsService: SettingsService,
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.user = <User>JSON.parse(this.cookieService.get('user'));
    this.logoUrl = `${environment.IMAGES_URL}/navbar_logo.png`;
    this.initStatus();
    this.startStatusCheck();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  get status() {
    return this.settingsService.connectionIsUp;
  }

  logout() {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.user = null;
          this.cookieService.delete('user', '/');
          this.router.navigateByUrl('login');
        },
        error: (err: HttpErrorResponse) => this.toaster.error(err.error.message || 'Could not perform logout')
      })
  }

  initStatus() {
    this.settingsService.getConnectionStatus()
      .subscribe({
        next: (res) => {
          this.settingsService.connectionIsUp = res;
          this.makeStatusPulse();
        },
        error: () => {
          this.settingsService.connectionIsUp = false;
          this.makeStatusPulse();
        }
      });
  }

  startStatusCheck() {
    const status = interval(this.globals.STATUS_INTERVAL)
      .pipe(
        flatMap(() => this.settingsService.getConnectionStatus())
      );

    this.subscription$ = status.subscribe({
      next: (res) => {
        this.settingsService.connectionIsUp = res;
        this.makeStatusPulse();
      },
      error: () => {
        this.settingsService.connectionIsUp = false;
        this.makeStatusPulse();
      }
    });
  }

  private makeStatusPulse() {
    const status = document.getElementById('connection-status');
    status.classList.add('animating');
    setTimeout(() => status.classList.remove('animating'), 1100);
  }

}
