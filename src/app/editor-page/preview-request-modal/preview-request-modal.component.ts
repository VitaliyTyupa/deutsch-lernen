import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {TaskOptionsService} from '../services/task-options.service';

@Component({
  selector: 'dl-preview-request-modal',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle
  ],
  templateUrl: './preview-request-modal.component.html',
  styleUrl: './preview-request-modal.component.scss'
})
export class PreviewRequestModalComponent implements OnInit {

  options: any[] = [];

  constructor(
    private taskOptionsService: TaskOptionsService,
    private dialogRef: MatDialogRef<PreviewRequestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.options = Object.keys(this.data).filter(key => !!this.data[key]).map(key => {
      if(key === 'taskType') {
        const values = this.data.taskType.map((id: string) => `${id}. ${this.taskOptionsService.getTaskName(id)}`);
        return { key: key, value: values.join(', ') };
      }
      return { key: key, value: this.data[key] };
    });

  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

  protected readonly Object = Object;
}
