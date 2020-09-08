import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticatedModule } from './authenticated/authenticated.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-bootstrap';
import { UtilsModule } from './utils/utils.module';
import { ConfigureComponent } from './configure/configure.component';
import { HttpInterceptorService } from './utils/services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfigureComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UtilsModule,
    NgxSpinnerModule,
    HttpClientModule,
    AuthenticatedModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
