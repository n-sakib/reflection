import { Component, OnInit} from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-gallery-type',
  templateUrl: './gallery-type.component.html',
  styleUrls: ['./gallery-type.component.css']
})
export class GalleryTypeComponent implements OnInit {

  selectedType = '';
  selectedCategory :string = '';
  public lists: any[] = [{ value: 'Dual' }, { value: 'Single'}];
  isPublished: boolean = true;
  typeFormControl = new FormControl('', [Validators.required]);
  typeform: FormGroup = new FormGroup({
    type: this.typeFormControl,
  });

  constructor(private storage: AngularFireStorage, public dialog: MatDialog, private database: AngularFireDatabase, private snackBar: MatSnackBar, public fb: FormBuilder,public dialogRef: MatDialog) {}

  type = new FormControl('', [Validators.required]);
  public form: FormGroup;

  getErrorMessage() {
    if (this.typeform.hasError('required')) {
      return 'You must enter a value';
    }
  }
  addType($event) {
    var value = $event.target.value;
    this.selectedType = value;
  }

  ngOnInit(): void {
  }

  completed: boolean = false;
  state: string;
  
  getRequiredErrorMessage(field) {
    return this.typeform.get(field).hasError('required') ? 'You must enter a value' : '';
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
  next(stepper, step) {
    switch (step) {
      case 1:
        if (this.selectedType === '' ) {
          this.snackBar.open('Please enter gallery type', 'OK', {
            duration: 2000,
          });
        } else {
          stepper.next();
        }
        break;
      case 2:
          if (this.selectedCategory=== '') {
            this.snackBar.open('Select a category.', 'OK', {
              duration: 2000,
            });
          } else {
            stepper.next();
          }
          break;
      case 3:
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

  publish() {
    // A post entry.
    var postData = {
      galleryName: this.selectedType,
      galleryType: this.selectedCategory,
    };

    console.log(postData)
    // Get a key for a new Post.
    this.database.list(`galleries/`).push(postData).then(() => {
      this.selectedType = '',
      this.selectedCategory = '',
        this.snackBar.open('Successfully uploaded testimonial.', 'OK', {
          duration: 2000,
        });
        this.dialogRef.closeAll();
    }) 
  }

}
