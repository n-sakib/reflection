import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from  "@angular/router";
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import { catchError, take } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLoggedIn = false


  constructor(public afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {}  

  signin(emailSignin, passwordSignin) {
    return this.afAuth.signInWithEmailAndPassword(emailSignin, passwordSignin)
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
    return this.afAuth.createUserWithEmailAndPassword(emailSignup, passwordSignup)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
        return res.user.uid;
      })
  }
  
  doFacebookLogin(){
    console.log("here")
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.default.auth.FacebookAuthProvider();
      this.afAuth.signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
 }

 doGoogleLogin(){
  console.log("here")
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.default.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider)
    .then(res => {
      resolve(res);
    }, err => {
      console.log(err);
      reject(err);
    })
  })
 }

//  doInstagramLogin(){
//   console.log("here")
//   return new Promise<any>((resolve, reject) => {
//     let provider = new firebase.default.auth.InstagramAuthProvider();
//     this.afAuth.signInWithPopup(provider)
//     .then(res => {
//       resolve(res);
//     }, err => {
//       console.log(err);
//       reject(err);
//     })
//   })
//  }

}
