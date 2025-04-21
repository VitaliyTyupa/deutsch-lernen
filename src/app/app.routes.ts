import { Routes } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {authGuard} from './utils/auth.guard';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: 'task-assistant',
    loadChildren: () => import('./tasks-assistant/task-assistant.routes')
      .then(route => route.taskAssistantRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'editor',
    loadComponent: () => import('./editor-page/editor-page.component').then(m => m.EditorPageComponent),
    canActivate: [authGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];
