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

  constructor(private toastr: ToastrService, public afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) { }

  signin(emailSignin, passwordSignin) {
    return this.afAuth.signInWithEmailAndPassword(emailSignin, passwordSignin)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
        console.log('Successfully signed in!');
        return res.user.uid;
      })
      .catch(err => {
        this.toastr.error(err.message);
        console.log(err)
      });
  }

  signup(emailSignup, passwordSignup) {
    return this.afAuth.createUserWithEmailAndPassword(emailSignup, passwordSignup)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
        return res.user.uid;
      })
      .catch(err => {
        console.log("here")
        console.log(err)
      });
  }

  doFacebookLogin = () => {
    this.afAuth.signInWithPopup(new firebase.default.auth.FacebookAuthProvider())
      .then(() => {
        this.isLoggedIn = true;
        this.router.navigate(['']);
      }, err => {
        if (err.code === 'auth/account-exists-with-different-credential')
          this.addProvider(err)
      })
  }

  doGoogleLogin = () => {
    this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
      .then(() => {
        this.isLoggedIn = true;
        this.router.navigate(['']);
      }, err => {
        console.log(err)
        if (err.code ==='auth/account-exists-with-different-credential')
          this.addProvider(err)
      })
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  doSignOut() {
    if (firebase.default.auth().currentUser) {
      this.afAuth.signOut();
      this.isLoggedIn = false;
      console.log("Sign-out successful.")
    }
    else {
      console.log("Something went wrong!!")
    }
  }

  addProvider = (error) => {
    var provider;
    firebase.default.auth().fetchSignInMethodsForEmail(error.email)
      .then(providers => {
        if (providers[0] === 'google.com') {
          provider = new firebase.default.auth.GoogleAuthProvider();
        } else {
          provider = new firebase.default.auth.FacebookAuthProvider();
        }

        provider.setCustomParameters({ login_hint: error.email });
        this.afAuth.signInWithPopup(provider)
          .then(res => {
            res.user.linkWithCredential(error.credential);
          })
          .catch(error => {
            console.log(error)
          })
      })
  }
}