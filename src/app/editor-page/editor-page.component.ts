import { Component } from '@angular/core';
import {QuillEditorComponent} from "ngx-quill";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCard, MatCardContent} from '@angular/material/card';
import {EditorSettingsComponent} from './editor-settings/editor-settings.component';
import {EditorGuideComponent} from './editor-guide/editor-guide.component';

@Component({
  selector: 'dl-editor-page',
  imports: [
    QuillEditorComponent,
    MatSidenavModule,
    MatCard,
    MatCardContent,
    EditorSettingsComponent,
    EditorGuideComponent,
  ],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss'
})
export class EditorPageComponent {

  sidebarClosed = false;


}
