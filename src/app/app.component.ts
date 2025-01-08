import { Component } from '@angular/core';
import {TopToolbarComponent} from './top-toolbar/top-toolbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'dl-root',
  imports: [
    TopToolbarComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
