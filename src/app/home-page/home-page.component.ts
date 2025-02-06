import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {QuillModule} from 'ngx-quill';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'dl-home-page',
  imports: [
    MatButton,
    QuillModule,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
