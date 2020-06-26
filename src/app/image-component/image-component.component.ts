import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    public dialog: MatDialog) { }
    imageform: FormGroup = new FormGroup({
      title: this.titleFormControl,
      description: this.descriptionFormControl,
    });
  ngOnInit(): void {
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
 
}
