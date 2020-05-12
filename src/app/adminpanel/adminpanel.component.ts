import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  imgSrc: string ='./assets/featured.jpeg';
  selectedImage :any = null;
  isSubmitted: boolean;
  formTemplete = new FormGroup({
    caption : new FormControl('',Validators.required),
    imageUrl : new FormControl('',Validators.required)
  })
  constructor(private storage: AngularFireStorage) { }

  ngOnInit(){
    this.resetForm();
  }
  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc= e.target.resut;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = './assets/featured.jpeg';
      this.selectedImage = null;
    }
  }
  onSubmit(formValue){
    console.log("click hoise")
    this.isSubmitted = true;
    if(this.formTemplete.valid){
      var filePath = `${formValue}/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef =  this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(finalize(()=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          formValue['imageUrl']=url;
          this.resetForm();
        })
      })
      ).subscribe();
    }
  }
  get formControls(){
    return this.formTemplete['controls'];
  }

  resetForm(){
    this.formTemplete.reset();
    this.formTemplete.setValue({
      caption: '',
      imageUrl:''
    });
    this.imgSrc = './assets/featured.jpeg';
    this.selectedImage=null;
    this.isSubmitted= false;
  }
}
