import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PublishImageComponent } from '../publish-image/publish-image.component';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.css']
})
export class FieldFormComponent implements OnInit {
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  imageform: FormGroup = new FormGroup({
    title: this.titleFormControl,
    description: this.descriptionFormControl,
  });
  getRequiredErrorMessage(field) {
    return this.imageform.get(field).hasError('required') ? 'You must enter a value' : '';
  }
  publishImage(): void {
    const dialogRef = this.dialog.open(PublishImageComponent, {
      width: '85%',height: '85%',
    });
  }
}
