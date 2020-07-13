import { Component, OnInit, Input, ViewChild, AfterContentInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PotraitPictureComponent } from '../potrait-picture/potrait-picture.component';
import { DigitalPictureComponent } from '../digital-picture/digital-picture.component';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list/grid-list';




@Component({
  selector: 'app-paid-picture',
  templateUrl: './paid-picture.component.html',
  styleUrls: ['./paid-picture.component.css']
})

export class PaidPictureComponent {
  breakpoint;
  @ViewChild('grid') grid: MatGridList;

  @Input() imageInfo


  constructor(private dialog: MatDialog, private database: AngularFireDatabase, private _sanitizer: DomSanitizer, private media: MediaObserver) { }

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
      width: '95vw', height: 'auto',
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
      width: '95vw', height: 'auto',
    });
    dialogRef.componentInstance.potraitInfo = potraitInfo;
  }
  getSanitizedFrame() {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${this.imageInfo.frameURL}) 30 stretch`);
  }
}
