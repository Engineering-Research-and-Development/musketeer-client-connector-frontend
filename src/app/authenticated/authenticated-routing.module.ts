import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedComponent } from './authenticated.component';
import { AuthGuard } from '../auth/auth.guard';
import { TasksListComponent } from '../tasks/tasks-list/tasks-list.component';
import { DataConnectorComponent } from '../worker/data-connector/data-connector.component';
import { TasksCreateComponent } from '../tasks/tasks-create/tasks-create.component';
import { EditConfigurationsComponent } from '../settings/edit-configurations/edit-configurations.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', redirectTo: 'tasks', pathMatch: 'full' },
          { path: 'tasks', component: TasksListComponent },
          { path: 'tasks/create', component: TasksCreateComponent },
          { path: 'settings/edit-configurations', component: EditConfigurationsComponent },
          { path: 'worker/datasets', component: DataConnectorComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }
