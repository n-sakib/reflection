import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLoggedIn = false;
  currentUser = new BehaviorSubject<any>(null);;



  constructor(private toastr: ToastrService, public afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {

  }

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
        this.toastr.error('Something is wrong:', err.message);
        console.log(emailSignin)
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
          this.isLoggedIn = true;
          this.currentUser.next(firebase.default.auth().currentUser);
          // console.log(this.currentUser.email)
          this.router.navigate(['']);
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
