import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ImageComponentComponent } from '../image-component/image-component.component';



@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  srcResult;
  frame: string;
  imgSrc: string ='./assets/featured.jpeg';
  selectedImage :any = null;
  isSubmitted: boolean = false;
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  constructor(private storage: AngularFireStorage,
    public dialog: MatDialog) { }

  ngOnInit(){}

  // showPreview(event: any){
  //   if(event.target.files && event.target.files[0]){
  //     const reader = new FileReader();
  //     reader.onload = (e:any) => this.imgSrc= e.target.resut;
  //     reader.readAsDataURL(event.target.files[0]);
  //     this.selectedImage = event.target.files[0];
  //   }
  //   else{
  //     this.imgSrc = './assets/featured.jpeg';
  //     this.selectedImage = null;
  //   }
  // }
  
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
  chooseFrame(){
    
  }
  imageform: FormGroup = new FormGroup({
    title: this.titleFormControl,
    description: this.descriptionFormControl,
  });
  getRequiredErrorMessage(field) {
    return this.imageform.get(field).hasError('required') ? 'You must enter a value' : '';
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ImageComponentComponent, {
      width: '85%',height: '85%',
    });
  }

}
