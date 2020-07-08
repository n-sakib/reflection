import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PotraitPictureComponent } from '../potrait-picture/potrait-picture.component';
import { DigitalPictureComponent } from '../digital-picture/digital-picture.component';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-paid-picture',
  templateUrl: './paid-picture.component.html',
  styleUrls: ['./paid-picture.component.css']
})
export class PaidPictureComponent implements OnInit {
  
  @Input() imageInfo;
 
 

  constructor(private dialog: MatDialog, private database: AngularFireDatabase) { }

  ngOnInit(): void {
    // this.breakpoint = (window.innerWidth <= 920) ? 1 : 2;
    console.log(this.imageInfo)
  
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
