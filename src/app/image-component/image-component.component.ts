import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-component.component.html',
  styleUrls: ['./image-component.component.css']
})
export class ImageComponentComponent {
  srcResult;
  imgSrc: string = './assets/featured.jpeg';
  selectedImage: any = null;
  isFrameSubmitted: boolean = false;
  isImageSubmitted: boolean = false;
  checked = false;
  indeterminate = false;
  selectedType = '';
  selectedOrientation = '';
  selectedFrameURL = '';
  selectedImageURL = '';
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  imageTypes: Observable<any[]>;
  frameUploadPercentage: Observable<number>;
  isFrameSubmitting: boolean = false;
  isImageSubmitting: boolean = false;
  selectedTitle: string = '';
  isPublished: boolean = true;
  selectedDescription: string = '';

  constructor(private storage: AngularFireStorage, public dialog: MatDialog, private database: AngularFireDatabase, private snackBar: MatSnackBar, private _sanitizer: DomSanitizer) {
    this.imageTypes = this.database.list(`admin/galleryTypes/`).snapshotChanges()
  }

  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return 'You must enter a value';
  }

  chooseView(view) {
    this.selectedOrientation = view;
  }

  addTitle($event) {
    var value = $event.target.value;
    this.selectedTitle = value;
  }

  addDescription($event) {
    var value = $event.target.value;
    this.selectedDescription = value;
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async onImageSelected() {
    this.isImageSubmitting = true;
    const file = (<HTMLInputElement>document.getElementById('imageFile')).files[0];
    this.toBase64(file).then(() => {
      const filePath = `${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.frameUploadPercentage = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            var downloadURL = fileRef.getDownloadURL();
            downloadURL.subscribe(url => {
              this.isImageSubmitted = true;
              this.selectedImageURL = url;
              this.isImageSubmitting = false;
            })
          })
        )
        .subscribe();
    })
  }

  publish() {
    // A post entry.
    var postData = {
      galleryName: this.selectedType,
      orientation: this.selectedOrientation,
      frameURL: this.selectedFrameURL,
      imageURL: this.selectedImageURL,
      title: this.selectedTitle,
      description: this.selectedDescription,
      galleryType: "dual"
    };

    console.log(postData)
    // Get a key for a new Post.
    this.database.list(`images/${this.selectedType}`).push(postData).then(() => {
      this.selectedType = '',
        this.selectedOrientation = '',
        this.selectedFrameURL = '',
        this.selectedImageURL = '',
        this.selectedTitle = '',
        this.selectedDescription = '',
        this.snackBar.open('Successfully uploaded image.', 'OK', {
          duration: 2000,
        });
    })

    // // Write the new post's data simultaneously in the posts list and the user's post list.
    // var updates = {};
    // updates['/posts/' + newPostKey] = postData;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    // return firebase.database().ref().update(updates);
  }

  next(stepper, step) {
    switch (step) {
      case 1:
        if (this.selectedType === '') {
          this.snackBar.open('Select an image type first.', 'OK', {
            duration: 2000,
          });
        } else {
          stepper.next();
        }
        break;
      case 2:
        if (this.selectedOrientation === '') {
          this.snackBar.open('Select an orientation first.', 'OK', {
            duration: 2000,
          });
        } else {
          stepper.next();
        }
        break;
      case 3:
        if (this.selectedFrameURL === '') {
          this.snackBar.open('Select a frame.', 'OK', {
            duration: 2000,
          });
        } else {
          stepper.next();
        }
        break;
      case 4:
        if (this.selectedImageURL === '') {
          this.snackBar.open('Upload your image.', 'OK', {
            duration: 2000,
          });
        } else {
          stepper.next();
        }
        break;
      case 5:
        if (this.selectedTitle === '' || this.selectedDescription === '') {
          this.snackBar.open('Enter Image Information.', 'OK', {
            duration: 2000,
          });
        } else {
          stepper.next();
        }
        break;
      case 6:
        if (this.isPublished === true) {
          this.snackBar.open('You have Successfully Published Your Image', 'OK', {
            duration: 2000,
          });
        }
        break;
      default:
      // code block
    }
  }

  onFrameSelected() {
    this.isFrameSubmitting = true;
    const file = (<HTMLInputElement>document.getElementById('frameFile')).files[0];
    this.toBase64(file).then(() => {
      const filePath = `${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.frameUploadPercentage = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            var downloadURL = fileRef.getDownloadURL();
            downloadURL.subscribe(url => {
              this.isFrameSubmitted = true;
              this.selectedFrameURL = url;
              this.isFrameSubmitting = false;
            })
          })
        )
        .subscribe();
    })
  }

  getSanitizedFrame() {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${this.selectedFrameURL}) 30 stretch`);
  }
}
