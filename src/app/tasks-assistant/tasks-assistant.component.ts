import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'dl-tasks-assistant',
  imports: [
    MatButton,
    MatIcon,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './tasks-assistant.component.html',
  styleUrl: './tasks-assistant.component.scss'
})
export class TasksAssistantComponent {

}
