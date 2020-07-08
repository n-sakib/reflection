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
  

  
  @Input() imageInfo;
 
 

  constructor(private dialog: MatDialog, private database: AngularFireDatabase) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 920) ? 1 : 2;
    console.log(this.imageInfo)
  
  }
  getUserProfileImage(galleryImg) {
    console.log('baaaal');
    console.log(galleryImg);
}
  digitalimageOnClick(imageURL) {
    let digitalInfo = {
      imageURL: "",
      description: "",
    };
    
    digitalInfo.description = this.imageInfo.description ;  
    digitalInfo.imageURL = imageURL;
      
    ;
    const dialogRef = this.dialog.open(DigitalPictureComponent, {
      width: '100%', height: '70%',
    });
    dialogRef.componentInstance.digitalInfo = digitalInfo;
  }
  potraitimageOnClick(imageURL) {
    let potraitInfo = {
      imageURL: "",
      description: "",
    };
    
    potraitInfo.description = this.imageInfo.description ;  
    potraitInfo.imageURL = imageURL;
      
    ;
    const dialogRef = this.dialog.open(PotraitPictureComponent, {
      width: '100%', height: '70%',
    });
    dialogRef.componentInstance.potraitInfo = potraitInfo;
  }
  onResize(event) {
     this.breakpoint = (event.target.innerWidth <= 1024) ? 2 : 3;
     }
  
  
  
}
