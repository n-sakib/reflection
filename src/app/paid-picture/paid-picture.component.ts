import { Component, OnInit, Input, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PotraitPictureComponent } from '../potrait-picture/potrait-picture.component';
import { DigitalPictureComponent } from '../digital-picture/digital-picture.component';
import { NONE_TYPE, SafeMethodCall } from '@angular/compiler';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';



@Component({
  selector: 'app-paid-picture',
  templateUrl: './paid-picture.component.html',
  styleUrls: ['./paid-picture.component.css']
})
export class PaidPictureComponent implements OnInit {
  breakpoint;
  galleryOptions: NgxGalleryOptions[];
  singleGalleryOptions: NgxGalleryOptions[];

  
  @Input() galleryImgs;
 
 

  constructor(private dialog: MatDialog, private database: AngularFireDatabase) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 920) ? 1 : 2;
    console.log(this.galleryImgs)
  
  }
  getUserProfileImage(galleryImg) {
    console.log('baaaal');
    console.log(galleryImg);
}
  imageOnClick2(): void {
    const dialogRef = this.dialog.open(DigitalPictureComponent, {
      width: '100%', height: '70%',
    });
  }
  potraitimageOnClick(): void {
    const dialogRef = this.dialog.open(PotraitPictureComponent, {
      width: '100%', height: '70%',
    });
  }
  onResize(event) {
     this.breakpoint = (event.target.innerWidth <= 825) ? 1 : 2;
     }
  
  
  
}
