import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { countries } from '../../../assets/countries.js';

@Component({
  selector: 'app-artist-authentication',
  templateUrl: './artist-authentication.component.html',
  styleUrls: ['./artist-authentication.component.scss']
})

export class ArtistAuthenticationComponent implements OnInit {

  countryList = countries;
  submitWithoutSelection = false;
  submitted = false;
  isSignUp = false;
  
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern("")]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.matchValues('password'),
    ]),
    dob: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required]),
    residency: new FormControl('', [Validators.required]),
    terms: new FormControl('', [Validators.requiredTrue])
  });

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern("")])
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm.controls.password.valueChanges.subscribe(() => {
      this.signupForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  onSignin() {
    this.signinForm.markAllAsTouched();
    this.signinForm.valid && this.authService.signin(this.signinForm.value)
  }

  // haveAccount() {
  //   this.isSignUp = false
  // }

  // onSignup() {
  //   if(this.passwordSignup === this.confirmPasswordSignup){
  //     this.isSignUp = true
  //     this.authService.signup(this.emailSignup, this.passwordSignup).then((res) => {
  //       this.isSignedIn = true
  //       var postData = {
  //         name: this.selectedName,
  //         nationality: this.selectedNationality,
  //         dob: this.selectedDob,
  //         emailsignup: this.emailSignup,
  //         passwordsignup: this.passwordSignup
  //       };
  
  //       // Get a key for a new Post.
  //       this.database.list(`users/`).set(`${res}/`, postData).then(() => {
  //         this.selectedName = ''
  //         this.selectedDob = ''
  //         this.selectedNationality = ''
  //         this.emailSignup = ''
  //         this.passwordSignup = ''
  //         // this.snackBar.open('Successfully uploaded data', 'OK', {
  //         //   duration: 2000,
  //         // });
  //       })
  //     })
  signup() {
    this.signupForm.markAllAsTouched();
    if(this.signupForm.value.residency === '') {
      this.submitWithoutSelection = true;
    }
    this.submitted = true;
    this.signupForm.valid && this.authService.signup(this.signupForm.value)
  }

  public matchValues(
    matchTo: string
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }
}
