import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from  "@angular/router";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { countries } from '../../../assets/countries.js';
import { AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-artist-authentication',
  templateUrl: './artist-authentication.component.html',
  styleUrls: ['./artist-authentication.component.scss']
})
export class ArtistAuthenticationComponent implements OnInit {

  isSignedIn = false;
  emailSignin = '';
  passwordSignin = '';
  isSignUp = false;
  selectedName = '';
  selectedDob = '';
  selectedNationality = '';
  emailSignup = '';
  passwordSignup = '';
  confirmPasswordSignup  = '';
  errorMessage: string = '';
  countryList = countries;
  passwordMatch = false;

  constructor(private authService: AuthService, private toastr: ToastrService, private storage: AngularFireStorage, private database: AngularFireDatabase, public router: Router, public store: AngularFirestore) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null)
      this.isSignedIn = true
    else
      this.isSignedIn = false;
    
  }

  onSignin() {
    this.authService.signin(this.emailSignin, this.passwordSignin)
    .then(res => {
      this.isSignedIn = true
        let userObservable = this.database.list(`users data/${res}/`).valueChanges();
        userObservable.subscribe(user =>{
          console.log(user)
          localStorage.setItem('user',JSON.stringify(user))
        }) 
      })
    } 

  createAccount() {
    this.isSignUp = true
  }

  haveAccount() {
    this.isSignUp = false
  }

  onSignup() {
    if(this.passwordSignup === this.confirmPasswordSignup){
      this.isSignUp = true
      this.authService.signup(this.emailSignup, this.passwordSignup).then((res) => {
        this.isSignedIn = true
        var postData = {
          name: this.selectedName,
          nationality: this.selectedNationality,
          dob: this.selectedDob,
          emailsignup: this.emailSignup,
          passwordsignup: this.passwordSignup
        };
  
        // Get a key for a new Post.
        this.database.list(`users data/`).set(`${res}/`, postData).then(() => {
          this.selectedName = ''
          this.selectedDob = ''
          this.selectedNationality = ''
          this.emailSignup = ''
          this.passwordSignup = ''
        })
      })
    }
    else{
      console.log("password error");
      this.toastr.error('Please correct form error or contact us');
    }
  }


  addName($event) {
    var value = $event.target.value;
    this.selectedName = value;
  }

  addNationality($event) {
    var value = $event.target.value;
    this.selectedNationality = value;
  }

  addDob($event) {
    var value = $event.target.value;
    this.selectedDob = value;
  }

  addEmail($event) {
    var value = $event.target.value.toString().trim();
    console.log(value)
    this.emailSignup = value;
  }

  addPassword($event) {
    var value = $event.target.value;
    this.passwordSignup = value;
  }

  addEmailSignin($event) {
    var value = $event.target.value.toString().trim();
    console.log(value)
    this.emailSignin = value;
  }

  addPasswordSignin($event) {
    var value = $event.target.value;
    this.passwordSignin = value;
  }

  addConfirmPassword($event) {
    var value = $event.target.value;
    this.confirmPasswordSignup = value;
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: any[]) {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }


}
