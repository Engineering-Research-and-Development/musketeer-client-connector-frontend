import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private globals: Globals,
    private http: HttpClient
  ) { }

  checkSession() {
    let user = this.cookieService.get('session');

    return user ? true : false;
  }

  login(user: User) {
    return this.http.post<User>(`${ this.globals.LOGIN_URL}`, user);
  }

  logout() {
    return this.http.post<any>(`${ this.globals.LOGOUT_URL}`, {});
  }

  register(user: User) {
    return this.http.post<User>(`${ this.globals.REGISTER_URL}`, user);
  }

  getUser(): User {
    let user = this.cookieService.get('user');

    return user ? JSON.parse(user) : null;
  }
}
