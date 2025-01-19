import {Component, inject, ViewChild} from '@angular/core';
import {QuillEditorComponent} from "ngx-quill";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCard, MatCardContent} from '@angular/material/card';
import {EditorSettingsComponent} from './editor-settings/editor-settings.component';
import {EditorGuideComponent} from './editor-guide/editor-guide.component';
import {MatButton} from '@angular/material/button';
import {EditorPageService} from './services/editor-page.service';
import {FormControl, FormGroup} from '@angular/forms';
import {SettingsForm} from '../types/editor.interface';

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

  settingsForm: FormGroup<SettingsForm> = new FormGroup({
    language: new FormControl('de'),
    languageLevel: new FormControl('A2'),
    count: new FormControl(5),
    autogenerateText: new FormControl(false),
    showAnswer: new FormControl(false),
  })

  getText() {
    const text = this.quill.quillEditor.getText();
    console.log(text);
    // this.quill.quillEditor.
    this.editorPageService.generateText(text).subscribe((response) => {
      console.log(response);
    });
    return this.quill.quillEditor.getText();
  }


}
