import { Routes } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './auth/login/login.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'editor', loadComponent: () =>
      import('./editor-page/editor-page.component').then(m => m.EditorPageComponent)},
  {path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)},
];
