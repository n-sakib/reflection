import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  uploadImage(): void {
    const dialogRef = this.dialog.open(ImageUploadComponent, {
      width: '85%',height: '85%',
    });
  }
}
