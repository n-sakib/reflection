import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-artist-authentication',
  templateUrl: './artist-authentication.component.html',
  styleUrls: ['./artist-authentication.component.scss']
})
export class ArtistAuthenticationComponent implements OnInit {

  isSignedIn= false;
  email = '';
  password = '';
  isSignUp = false;
  selectedName = '';
  selectedDob = '';
  selectedNationality = '';
  emailsignup = '';
  passwordsignup = '';
  

  constructor(private firebaseAuth: AngularFireAuth, private authService: AuthService, private storage: AngularFireStorage, private database: AngularFireDatabase) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null)
    this.isSignedIn= true
    else
    this.isSignedIn= false
  }

  async onsignin(email: string, password: string){
    console.log(email)
    console.log(password)
     await this.authService.signin(email,password)  
     if(this.authService.isLoggedIn)
     this.isSignedIn= true
  }
  
  createAccount(){
    this.isSignUp = true
  }

  haveAccount(){
    this.isSignUp = false
  }

  async onsignup(emailsignup: string, passwordsignup: string){
    this.isSignUp = true
    console.log(emailsignup)
    console.log(passwordsignup)
     await this.authService.signup(emailsignup,passwordsignup)
     if(this.authService.isLoggedIn)
     this.isSignedIn= true
     console.log('baal')
     // A post entry.
    var postData = {
      name: this.selectedName,
      nationality: this.selectedNationality,
      dob: this.selectedDob,
      emailsignup: this.emailsignup,
      passwordsignup: this.passwordsignup
    };

    console.log(postData)
    // Get a key for a new Post.
    this.database.list(`users data/${this.authService.key}`).push(postData).then(() => {
        this.selectedName = ''
        this.selectedDob = ''
        this.selectedNationality = ''
        this.emailsignup =''
        this.passwordsignup = ''
        // this.snackBar.open('Successfully uploaded data', 'OK', {
        //   duration: 2000,
        // });
    })
  }

  addName($event){
    var value = $event.target.value;
    this.selectedName = value;
  }

  addNationality($event){
    var value = $event.target.value;
    this.selectedNationality = value;
  }

  addDob($event){
    var value = $event.target.value;
    this.selectedDob = value;
  }

  addEmail($event){
    var value = $event.target.value;
    this.emailsignup = value;
  }

  addPassword($event){
    var value = $event.target.value;
    this.passwordsignup = value;
  }

}
