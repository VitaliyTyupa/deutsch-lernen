import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'dl-top-toolbar',
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatToolbar,
    RouterLink
  ],
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.scss'
})
export class TopToolbarComponent {

}
