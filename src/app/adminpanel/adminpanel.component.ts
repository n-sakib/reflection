import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabaseModule } from '@angular/fire/database';

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
  constructor(private storage: AngularFireStorage) { }

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
}
