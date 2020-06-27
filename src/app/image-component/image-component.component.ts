import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-component.component.html',
  styleUrls: ['./image-component.component.css']
})
export class ImageComponentComponent implements OnInit {
  srcResult;
  frame: string;
  imgSrc: string ='./assets/featured.jpeg';
  selectedImage :any = null;
  isSubmitted: boolean = false;
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  checked = false;
  indeterminate = false;
  selected='';
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  constructor(private storage: AngularFireStorage,
    public dialog: MatDialog, private database: AngularFirestore) { }
    imageform: FormGroup = new FormGroup({
      title: this.titleFormControl,
      description: this.descriptionFormControl,
    });

    email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit(): void {
   this.getimageTypes();
  }
  getimageTypes(){
    var imageType;
    var imageTypeDoc = this.database.collection('admin').doc('galleryTypes');
    imageTypeDoc.get().subscribe(imageTypes=>console.log(imageTypes.data()));
    
  }
  getRequiredErrorMessage(field) {
    return this.imageform.get(field).hasError('required') ? 'You must enter a value' : '';
  }
  uploadImage(){

  }
  chooseView(){
    
  }
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

  async onFileSelected() {
   const file = (<HTMLInputElement>document.getElementById('file')).files[0];
   this.toBase64(file).then((res) => {
      this.srcResult = res;
      const filePath = `${new Date().getTime()}`;
      const fileRef =  this.storage.ref(filePath);
      fileRef.putString(this.srcResult, 'data_url').then(function(snapshot) {
        console.log(snapshot)
      })
      this.isSubmitted = true;
   })
  }
  // writeNewImage(uid, username, picture, title, body) {
  //   // A post entry.
  //   var postData = {
  //     author: username,
  //     uid: uid,
  //     body: body,
  //     title: title,
  //     starCount: 0,
  //     authorPic: picture
  //   };
  
  //   // Get a key for a new Post.
  //   var newPostKey = firebase.database().ref().child('posts').push().key;
  
  //   // Write the new post's data simultaneously in the posts list and the user's post list.
  //   var updates = {};
  //   updates['/posts/' + newPostKey] = postData;
  //   updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
  //   return firebase.database().ref().update(updates);
  // }
}
