import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedComponent } from './authenticated.component';
import { AuthGuard } from '../auth/auth.guard';
import { TasksListComponent } from '../tasks/tasks-list/tasks-list.component';
import { TasksCreateComponent } from '../tasks/tasks-create/tasks-create.component';
import { EditConfigurationsComponent } from '../settings/edit-configurations/edit-configurations.component';
import { DatasetsListComponent } from '../datasets/datasets-list/datasets-list.component';
import { ProfileComponent } from '../settings/profile/profile.component';
import { ModelsListComponent } from '../models/models-list/models-list.component';
import { TaskDetailComponent } from '../tasks/task-detail/task-detail.component';

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
          { path: 'tasks/:task_name', component: TaskDetailComponent },
          { path: 'settings/edit-configurations', component: EditConfigurationsComponent },
          { path: 'settings/profile', component: ProfileComponent },
          { path: 'datasets', component: DatasetsListComponent },
          { path: 'models', component: ModelsListComponent },
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
