import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from '@angular/router';
import {TextGeneratorApiService} from '../common-services/api-services/text-generator-api.service';

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
  textGenerator = inject(TextGeneratorApiService);

  checkConnection() {
    this.textGenerator.checkConnection().subscribe((res: any) => {
      console.log('Status of connection:', res);
    });
  }
}
