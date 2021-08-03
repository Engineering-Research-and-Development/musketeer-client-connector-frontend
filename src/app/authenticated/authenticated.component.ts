import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/model/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';

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

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private toaster: ToastrService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.user = <User>JSON.parse(this.cookieService.get('user'));
    this.logoUrl = `${environment.IMAGES_URL}/navbar_logo.png`;
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

}
