import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from "@angular/router";
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import { catchError, take } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLoggedIn = false;
  currentUser = new BehaviorSubject<any>(null);;



  constructor(public afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {

  }

  signin(emailSignin, passwordSignin) {
    console.log("dhukse")
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

  doFacebookLogin() {
    let provider = new firebase.default.auth.FacebookAuthProvider();
    this.afAuth.signInWithPopup(provider)
      .then(() => {
        this.isLoggedIn = true;
        this.currentUser.next(firebase.default.auth().currentUser);
        
        // this.currentUser.email? console.log(user.email): null;
        //this.router.navigate(['http://localhost:4200/artist/dashboard']);
      }, err => {
        console.log(err);
      })
  }

  doGoogleLogin() {
      let provider = new firebase.default.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.signInWithPopup(provider)
        .then(() => {
          this.currentUser.next(firebase.default.auth().currentUser);
          // console.log(this.currentUser.email)
          this.router.navigate(['./artist/dashboard']);
        }, err => {
          console.log(err);
        })
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  doSignOut(){
      if(firebase.default.auth().currentUser){
        this.afAuth.signOut();
        this.isLoggedIn = false;
        console.log("Sign-out successful.")
      }
      else{
        console.log("Something went wrong!!")
      }
  }


}
