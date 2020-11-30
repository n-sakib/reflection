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
  errorMessage: string = '';
  userData;

  constructor(private authService: AuthService, private storage: AngularFireStorage, private database: AngularFireDatabase, public router: Router, public store: AngularFirestore) { 
    
    
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null)
      this.isSignedIn = true
    else
      this.isSignedIn = false
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
      
      // this.firebaseAuth.authState.subscribe(user => {
      //   if (user) {
      //     this.userData = user;
      //     // console.log(user)
      //     localStorage.setItem('user', JSON.stringify(this.userData));
      //     JSON.parse(localStorage.getItem('user'));
      //     const userRef: AngularFirestoreDocument<any> = this.store.doc(`users data/${user.res}`);
      //     var signInData = {
      //       name: this.selectedName,
      //       nationality: this.selectedNationality,
      //       dob: this.selectedDob,
      //       emailsignup: this.emailSignup,
      //       passwordsignup: this.passwordSignup
      //     }
      //     console.log(signInData); 
      //   } else {
      //     localStorage.setItem('user', null);
      //     JSON.parse(localStorage.getItem('user'));
      //   }
      // })
   
  }

  createAccount() {
    this.isSignUp = true
  }

  haveAccount() {
    this.isSignUp = false
  }

  onSignup() {
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
        // this.snackBar.open('Successfully uploaded data', 'OK', {
        //   duration: 2000,
        // });
      })
    })
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

  loginViaFacebook() {
    this.authService.doFacebookLogin().then((res) => {
      console.log(res)
    })
  }

  loginViaGoogle() {
    this.authService.doGoogleLogin().then((res) => {
      console.log(res)
    })
  }

  // loginViaInstagram() {
  //   this.authService.doInstagramLogin().then((res) => {
  //     console.log(res)
  //   })
  // }

}
