import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ConfigureComponent } from './configure/configure.component';


const routes: Routes = [
  // { path: '', redirectTo: 'configure', pathMatch: 'full' },
  { path: 'configure', component: ConfigureComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
