import { Routes } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {authGuard} from './utils/auth.guard';

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
  {path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)},
  {path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)},
];
