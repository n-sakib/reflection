import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digital-picture',
  templateUrl: './digital-picture.component.html',
  styleUrls: ['./digital-picture.component.css']
})
export class DigitalPictureComponent implements OnInit {
  breakpoint;
  constructor() { }

  ngOnInit(): void {
    // this.database.list('images/').snapshotChanges()
    // .subscribe({
    //   next: images => {
        
    //     images.forEach(imageType => {
    //       var imageObject:any = {};
    //       imageObject.images = [];
    //       imageObject.type = imageType.key;
    //       var val = imageType.payload.val();
    //       Object.keys(val).forEach((image:any) => {
    //         imageObject.images.push({
    //         small: val[image].imageURL,
    //         medium: val[image].imageURL,
    //         big: val[image].imageURL})
    //       }); 
    //       this.galleryImgs.push(imageObject)
    //     });
    //     console.log(this.galleryImgs);
    //   },
    //   error: err => console.error('something wrong occurred: ' + err),
    //   complete: () => { console.log("done") }
    // })
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 825) ? 1 : 2;
    }
}
