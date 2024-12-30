import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {
  MatAnchor,
  MatButton,
  MatFabAnchor,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton
} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'dl-root',
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatButton
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
