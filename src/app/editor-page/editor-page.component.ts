import {Component, inject, ViewChild} from '@angular/core';
import {QuillEditorComponent} from "ngx-quill";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCard, MatCardContent} from '@angular/material/card';
import {EditorSettingsComponent} from './editor-settings/editor-settings.component';
import {EditorGuideComponent} from './editor-guide/editor-guide.component';
import {MatButton} from '@angular/material/button';
import {EditorPageService} from './services/editor-page.service';

@Component({
  selector: 'dl-editor-page',
  imports: [
    QuillEditorComponent,
    MatSidenavModule,
    MatCard,
    MatCardContent,
    EditorSettingsComponent,
    EditorGuideComponent,
    MatButton,
  ],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss'
})
export class EditorPageComponent {
  @ViewChild('quill') quill!: QuillEditorComponent;
  editorPageService = inject(EditorPageService);

  getText() {
    const words = [
      'herausfinden',
      'anwenden',
      'verwenden',
    ]
    this.editorPageService.generateText(words).subscribe((response) => {
      console.log(response);
    });
    return this.quill.quillEditor.getText();
  }


}
