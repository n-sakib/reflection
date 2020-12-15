import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  isLoggedIn = false;
  currentUser = new BehaviorSubject<any>(null);;

  constructor(private util: UtilsService, public afAuth: AngularFireAuth, private router: Router, private database: AngularFireDatabase) { }

  signin(data) {
    return this.afAuth.signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.router.navigate(['']);
      })
      .catch(err => {
        this.util.showError(err.message);
        console.log(err)
      });
  }

  signup(data) {
    this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: data.name,
          photoURL: `https://eu.ui-avatars.com/api/?name=${data.name}&size=256`
        }).then(() => {
          delete data.password;
          delete data.confirmPassword;
          delete data.terms;
          this.database.list(`users/`).set(`${res.user.uid}/`, data)
            .catch(err => {
              this.util.showError(err.message);
              console.log(err)
            });
          this.router.navigate(['']);
        })
          .catch(err => {
            this.util.showError(err.message);
            console.log(err)
          });
      })
      .catch(err => {
        this.util.showError(err.message);
        console.log(err)
      });
  }

  doFacebookLogin = () => {
    this.afAuth.signInWithPopup(new firebase.default.auth.FacebookAuthProvider())
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          res.user.updateProfile({
            photoURL: `${res.user.photoURL}?width=256&height=256`
          }).then(() => {
            let data = {
              name: res.user.displayName,
              email: res.user.email
            }
            this.database.list(`users/`).set(`${res.user.uid}/`, data)
              .catch(err => {
                this.util.showError(err.message);
                console.log(err)
              });
            this.router.navigate(['']);
          })
            .catch(err => {
              this.util.showError(err.message);
              console.log(err)
            });
        }
        this.router.navigate(['']);
      }, err => {
        if (err.code === 'auth/account-exists-with-different-credential')
          this.addProvider(err)
      })
  }

  doGoogleLogin = () => {
    this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          res.user.updateProfile({
            photoURL: res.user.photoURL.replace("=s96-c", "=s256-c")
          }).then(() => {
            let data = {
              name: res.user.displayName,
              email: res.user.email
            }
            this.database.list(`users/`).set(`${res.user.uid}/`, data)
              .catch(err => {
                this.util.showError(err.message);
                console.log(err)
              });
            this.router.navigate(['']);
          })
            .catch(err => {
              this.util.showError(err.message);
              console.log(err)
            });
        }
        this.router.navigate(['']);
      }, err => {
        console.log(err)
        if (err.code === 'auth/account-exists-with-different-credential')
          this.addProvider(err)
      })
  }

  doSignOut() {
    if (firebase.default.auth().currentUser) {
      this.afAuth.signOut();
      this.isLoggedIn = false;
    }
    else {
      this.util.showError('Cannot sign out.');
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
            this.router.navigate(['']);
          })
          .catch(error => {
            console.log(error)
          })
      })
  }

  // // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser.sendEmailVerification()
  //   .then(() => {
  //     this.router.navigate(['verify-email-address']);
  //   })
  // }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }
}