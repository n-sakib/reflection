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
import { TestimonialComponent } from '../testimonial/testimonial.component';



@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {
  srcResult;
  frame: string;
  imgSrc: string ='./assets/featured.jpeg';
  selectedImage :any = null;
  isSubmitted: boolean = false;
  showFiller = true;

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
  

  openDialog(): void {
    const dialogRef = this.dialog.open(ImageComponentComponent, {
      width: '100%',height: '85%',
    });
    dialogRef.afterClosed().subscribe(data=>{
      console.log("Closed",data);
  })
   
  }

  openTestimonial(): void {
    const dialogRef = this.dialog.open(TestimonialComponent, {
      width: '100%',height: '85%',
    });
    dialogRef.afterClosed().subscribe(data=>{
      console.log("Closed",data);
  })
  }

}
