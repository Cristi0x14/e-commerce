import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-agreement-dialog',
  templateUrl: './agreement-dialog.component.html',
  styleUrls: ['./agreement-dialog.component.css']
})
export class AgreementDialogComponent {
  constructor(public dialogRef: MatDialogRef<AgreementDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}