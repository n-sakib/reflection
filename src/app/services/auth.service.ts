import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from  "@angular/router";
import {auth} from 'firebase/app';
 
// These imports load individual services into the firebase namespace.
import { catchError, take } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLoggedIn = false


  constructor(public firebaseauth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {}  

  signin(emailSignin, passwordSignin) {
    return this.firebaseauth.signInWithEmailAndPassword(emailSignin, passwordSignin)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
        console.log('Successfully signed in!');
        return res.user.uid;
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }
  
  signup(emailSignup, passwordSignup) {
    return this.firebaseauth.createUserWithEmailAndPassword(emailSignup, passwordSignup)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
        return res.user.uid;
      })
  }
  

  // login() {
  //   this.firebaseauth
  //     .loginViaGoogle()
  //     .pipe(
  //       take(1),
  //       catchError((error) => {
  //         console.log("failed")
  //         return EMPTY;
  //       }),
  //     )
  //     .subscribe(
  //       (response) =>
  //         response &&
  //         console.log("YESSSSS")
  //     );
  // }
}
