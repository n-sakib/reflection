import { Component, OnInit} from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  srcResult;
  frame: string;
  testiSrc: string = './assets/featured.jpeg';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  imageUploadPercentage: Observable<number>;
  nameFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  imageform: FormGroup = new FormGroup({
    name: this.nameFormControl,
    address: this.addressFormControl,
    description: this.descriptionFormControl,
  });
  email = new FormControl('', [Validators.required, Validators.email]);
  selectedName: string = '';
  selectedDescription: string = '';
  selectedAddress: string = '';
  totalstar = 5;


  // srcResult;
  imgSrc: string = './assets/featured.jpeg';
  // selectedImage: any = null;
  isPublished: boolean = true;
  checked = false;
  indeterminate = false;
  selectedType = '';
  selectedOrientation = '';
  selectedImageURL = '';
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  isImageSubmitting: boolean = false;
  selectedRating:number;
  isImageSubmitted: boolean = false;

  constructor(private storage: AngularFireStorage, public dialog: MatDialog, private database: AngularFireDatabase, private snackBar: MatSnackBar, public fb: FormBuilder,public dialogRef: MatDialog) {}

  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  
  public form: FormGroup;
  


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessage1() {
    if (this.imageform.hasError('required')) {
      return 'You must enter a value';
    }
  }
  addName($event) {
    var value = $event.target.value;
    this.selectedName = value;
  }

  addDescription($event) {
    var value = $event.target.value;
    this.selectedDescription = value;
  }

  addAddress($event) {
    var value = $event.target.value;
    this.selectedAddress = value;
  }

  

  ngOnInit(): void {
   
   
    
  }
  completed: boolean = false;
  state: string;
  
  getRequiredErrorMessage(field) {
    return this.imageform.get(field).hasError('required') ? 'You must enter a value' : '';
  }
  done() {
    this.completed = true;
    this.state = 'done';
  }
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  
  
  

  onRate(event) {
        this.selectedRating = event.newValue;
  }
  

  next(stepper, step) {
    switch (step) {
      case 1:
        if (this.selectedName === '' && this.selectedAddress === '' || this.selectedDescription === '') {
          this.snackBar.open('Please enter your details.', 'OK', {
            duration: 2000,
          });
        } else {
          stepper.next();
        }
        break;
      case 2:
        if (this.selectedImageURL === '') {
          this.snackBar.open('Please upload the image.', 'OK', {
            duration: 2000,
          });
        } else {
          stepper.next();
        }
        break;
      case 3:
        console.log(this.selectedRating)
        if (typeof this.selectedRating === 'undefined') {
          this.snackBar.open('Please rate the service.', 'OK', {
            duration: 2000,
          });
        } else {
          stepper.next();
        }
        break;
      case 4:
        if (this.isPublished === false) {
          this.snackBar.open('Please publish your testimonial', 'OK', {
            duration: 2000,
          });
        }
        break;
      default:
      // code block
    }
  }

  async onImageSelected() {
    this.isImageSubmitting = true;
    const file = (<HTMLInputElement>document.getElementById('imageFile')).files[0];
    this.toBase64(file).then(() => {
      const filePath = `${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.imageUploadPercentage = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            var downloadURL = fileRef.getDownloadURL();
            downloadURL.subscribe(url => {
              this.isImageSubmitted = true;
              this.selectedImageURL = url;
              this.isImageSubmitting = false;
            })
          })
        )
        .subscribe();
    })
  }
  publish() {
    // A post entry.
    var postData = {
      userName: this.selectedName,
      userAddress: this.selectedAddress,
      imageURL: this.selectedImageURL,
      description: this.selectedDescription,
      userRating: this.selectedRating,
    };

    console.log(postData)
    // Get a key for a new Post.
    this.database.list(`testimonials/`).push(postData).then(() => {
      this.selectedName = '',
        this.selectedAddress = '',
        this.selectedImageURL = '',
        this.selectedDescription = '',
        this.selectedRating = 0,
        this.snackBar.open('Successfully uploaded testimonial.', 'OK', {
          duration: 2000,
        });
        this.dialogRef.closeAll();
    }) 

    // // Write the new post's data simultaneously in the posts list and the user's post list.
    // var updates = {};
    // updates['/posts/' + newPostKey] = postData;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    // return firebase.database().ref().update(updates);
  }
  
  
}
