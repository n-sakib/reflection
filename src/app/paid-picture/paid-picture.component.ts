import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PotraitPictureComponent } from '../potrait-picture/potrait-picture.component';
import { DigitalPictureComponent } from '../digital-picture/digital-picture.component';
import { NONE_TYPE, SafeMethodCall } from '@angular/compiler';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-paid-picture',
  templateUrl: './paid-picture.component.html',
  styleUrls: ['./paid-picture.component.css']
})
export class PaidPictureComponent implements OnInit {
  breakpoint;



  @Input() imageInfo;



  constructor(private dialog: MatDialog, private database: AngularFireDatabase, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 1024) ? 1 : 3;
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
      frameURL: "",
    };

    digitalInfo.description = this.imageInfo.description;
    digitalInfo.imageURL = imageURL;
    digitalInfo.frameURL = this.imageInfo.frameURL;

    ;
    const dialogRef = this.dialog.open(DigitalPictureComponent, {
      width: '80%', height: '70%',
    });
    dialogRef.componentInstance.digitalInfo = digitalInfo;
  }
  potraitimageOnClick(imageURL) {
    let potraitInfo = {
      imageURL: "",
      description: "",
      frameURL: "",
    };
    potraitInfo.frameURL = this.imageInfo.frameURL;
    potraitInfo.description = this.imageInfo.description;
    potraitInfo.imageURL = imageURL;

    ;
    const dialogRef = this.dialog.open(PotraitPictureComponent, {
      width: '80%', height: '70%',
    });
    dialogRef.componentInstance.potraitInfo = potraitInfo;
  }
  getSanitizedFrame() {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${this.imageInfo.frameURL}) 30 stretch`);
  }
  onResizeVideo(event){
    this.breakpoint = (event.target.innerWidth < 1025) ? 1 : 3;
  }

}
