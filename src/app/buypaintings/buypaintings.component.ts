import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-buypaintings',
  templateUrl: './buypaintings.component.html',
  styleUrls: ['./buypaintings.component.css']
})

export class BuypaintingsComponent implements OnInit {

  galleryImgs = [];

  constructor(public router: Router, private storage: AngularFireStorage, public dialog: MatDialog, private database: AngularFireDatabase) { }

  ngOnInit(): void {


    this.database.list('images/').snapshotChanges()
      .subscribe({
        next: images => {
          images.forEach(image => {
            var val = image.payload.val();
            Object.keys(val).forEach((demo: any) => {
              var imageObject: any = {
                galleryName: [],
                title: [],
                description: [],
                artist: [],
                medium: [],
                orientation: [],
                price: [],
                size: [],
                frame: [],
                imageURL: [],
              };
              imageObject.type = image.key;
              let imageURL = val[demo].imageURL;
              let galleryName = val[demo].galleryName;
              let title = val[demo].title;
              let artist = val[demo].artist;
              let description = val[demo].description;
              let medium = val[demo].medium;
              let orientation = val[demo].orientation;
              let price = val[demo].price;
              let size = val[demo].size;
              let frame = val[demo].frame;

              imageObject.description.push(description);
              imageObject.galleryName.push(galleryName);
              imageObject.imageURL.push(imageURL);
              imageObject.artist.push(artist);
              imageObject.title.push(title);
              imageObject.medium.push(medium);
              imageObject.orientation.push(orientation);
              imageObject.price.push(price);
              imageObject.size.push(size);
              imageObject.frame.push(frame);

              this.galleryImgs.push(imageObject);
            })


          });
          console.log(this.galleryImgs)

        }
      })

  }
  navigateToDetail(gallery) {
    console.log(gallery)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "gallery": JSON.stringify(gallery)
      }
    };

    this.router.navigate(["/buyDetails"], navigationExtras);
  }

  // buyPainting(imageURL, title, artist) {

  //   let paintingInfo = {
  //     imageURL: "",
  //     title: "",
  //     artist: "",
  //   };
  //   this.galleryImgs.forEach(gallery => {

  //     paintingInfo.imageURL = imageURL;
  //     paintingInfo.title = title;
  //     paintingInfo.artist = artist;
  //   });

  //   const dialogRef = this.dialog.open(ShoppingComponent, {
  //     width: 'auto', height: 'auto',
  //   });
  //   dialogRef.componentInstance.paintingInfo = paintingInfo;
  // }


}