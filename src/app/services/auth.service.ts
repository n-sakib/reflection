import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLoggedIn= false
  constructor(public firebaseauth: AngularFireAuth) { }


  async signin(email: string, password: string) {
    this.firebaseauth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user',JSON.stringify(res.user))
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }
  async signup(emailsignup: string, passwordsignup: string) {
    this.firebaseauth.createUserWithEmailAndPassword(emailsignup, passwordsignup)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user',JSON.stringify(res.user))
        console.log('Successfully signed up!', res);
      })  
  }

}
