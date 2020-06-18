import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ImageComponentComponent } from '../image-component/image-component.component';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { FieldFormComponent } from '../field-form/field-form.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  srcResult;
  frame: string;
  imgSrc: string ='./assets/featured.jpeg';
  selectedImage :any = null;
  isSubmitted: boolean = false;
  constructor(private storage: AngularFireStorage,
    public dialog: MatDialog) { }

  ngOnInit(): void {
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
  fieldform(): void {
    const dialogRef = this.dialog.open(FieldFormComponent, {
      width: '85%',height: '85%',
    });
  }
}
