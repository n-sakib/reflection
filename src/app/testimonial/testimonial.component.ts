import { Component, OnInit } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  srcResult;
  frame: string;
  testiSrc: string = './assets/featured.jpeg';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  constructor(private storage: AngularFireStorage) { }
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
  }
  completed: boolean = false;
  state: string;
  getRequiredErrorMessage(field) {
    return this.imageform.get(field).hasError('required') ? 'You must enter a value' : '';
  }
  done() {
      this.completed = true;
      this.state = 'done';
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
      const fileRef = this.storage.ref(filePath);
      fileRef.putString(this.srcResult, 'data_url').then(function (snapshot) {
        console.log(snapshot)
      })
      this.isSubmitted = true;
    })
  }
}
