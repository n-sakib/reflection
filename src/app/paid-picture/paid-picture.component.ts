import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PotraitPictureComponent } from '../potrait-picture/potrait-picture.component';
import { DigitalPictureComponent } from '../digital-picture/digital-picture.component';


@Component({
  selector: 'app-paid-picture',
  templateUrl: './paid-picture.component.html',
  styleUrls: ['./paid-picture.component.css']
})
export class PaidPictureComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  digitalimageOnClick(): void {
    const dialogRef = this.dialog.open(DigitalPictureComponent, {
      width: '100%', height: '90%',
    });
  }
  potraitimageOnClick(): void {
    const dialogRef = this.dialog.open(PotraitPictureComponent, {
      width: '100%', height: '90%',
    });
  }
}
