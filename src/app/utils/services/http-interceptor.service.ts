import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private toaster: ToastrService,
    private cookies: CookieService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      withCredentials: true
    });

    return next
      .handle(modifiedReq)
      .pipe(
        tap(),
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.toaster.error('Error', 'Token has expired');
              this.cookies.delete('session');
              this.cookies.delete('user');
              this.router.navigateByUrl('login');
            }
          }

          return throwError(err);
        })
      );
  }

}
