import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-artist-dashboard',
  templateUrl: './artist-dashboard.component.html',
  styleUrls: ['./artist-dashboard.component.scss']
})
export class ArtistDashboardComponent implements OnInit {

  isImageSubmitting: boolean = false;
  frameUploadPercentage: Observable<number>;
  isImageSubmitted: boolean = false;
  selectedImageURL = '';
  user = {
    email: '',
    photoURL: '',
    displayName: '',
    uid: ''
  };
  selectedTitle = '';
  selectedType = '';
  selectedCategory = '';
  selectedHeight = '';
  selectedWidth = '';
  selectedConcept = '';
  selectedYear = '';
  selectedReplica = '';
  selectedSellOption = '';
  selectedSchool = '';
  selectedCertificate = '';
  selectedEduYear = '';
  imagePreview = ''
  selectedEduOption = '';
  public media1Lists: any[] = [{ value: 'Oil Paint on Canvas' }, { value: 'Oil Paint on Board' }, { value: 'Acrylic Paint on Canvas' }, { value: 'Acrylic Paint on Paper' },
  { value: 'Acrylic Paint on Board' }, { value: 'Watercolor on Paper' }, { value: 'Poster Color on Paper' }, { value: 'Graphite Pencil on Paper' }, { value: 'Charcoal on Paper' }, { value: 'Other Media' }];
  public media2Lists: any[] = [{ value: 'Oil Paint on Canvas' }, { value: 'Oil Paint on Board' }, { value: 'Acrylic Paint on Canvas' }, { value: 'Acrylic Paint on Paper' }, { value: 'Woodcut' }, { value: 'Lithography' },
  { value: 'Acrylic Paint on Board' }, { value: 'Watercolor on Paper' }, { value: 'Poster Color on Paper' }, { value: 'Graphite Pencil on Paper' }, { value: 'Charcoal on Paper' }, { value: 'Other Media' }];

  educations = [];


  constructor(private toastr: ToastrService, private storage: AngularFireStorage, private database: AngularFireDatabase, private afAuth: AngularFireAuth, public auth: AuthService) { }

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user => {
      this.user = user;
      this.database.list(`users/${this.user.uid}/education`).snapshotChanges()
        .subscribe({
          next: educations => {
            this.educations = []
            educations.forEach(education => {
              let val = education.payload.val();
              val['key'] = education.key;
              this.educations.push(val);
              console.log(this.educations)
            });
          }
        })
    })
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  onImageSelected(event) {
    this.isImageSubmitting = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.selectedImageURL = event.target.result;
        // console.log(this.selectedImageURL)
        // this.isImageSubmitted = true
      }
    }
  }



  // const file = (<HTMLInputElement>document.getElementById('imageFile')).files[0];
  // this.toBase64(file).then(() => {
  //   const filePath = `${new Date().getTime()}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);
  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         var downloadURL = fileRef.getDownloadURL();
  //         downloadURL.subscribe(url => {
  //           this.isImageSubmitted = true;
  //           this.selectedImageURL = url;
  // async onImageSelected() {
  //   console.log((<HTMLInputElement>document.getElementById('imageFile')).files[0]);
  //   // this.imagePreview=
  //   const file = (<HTMLInputElement>document.getElementById('imageFile')).files[0];
  //   this.toBase64(file).then(() => {
  //     const filePath = `${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     const task = this.storage.upload(filePath, file);
  //     task
  //       .snapshotChanges()
  //       .pipe(
  //         finalize(() => {
  //           var downloadURL = fileRef.getDownloadURL();
  //           downloadURL.subscribe(url => {
  //             this.isImageSubmitted = true;
  //             this.selectedImageURL = url;

  //         })
  //       })
  //     )
  //     .subscribe();
  // })


  addTitle($event) {
    var value = $event.target.value;
    this.selectedTitle = value;
  }

  addType($event) {
    var value = $event.target.value;
    this.selectedType = value;
  }
  // addCategory($event) {
  //   var value = $event.target.value;
  //   this.selectedCategory = value;
  // }
  addHeight($event) {
    var value = $event.target.value;
    this.selectedHeight = value;
  }
  addWidth($event) {
    var value = $event.target.value;
    this.selectedWidth = value;
  }
  addConcept($event) {
    var value = $event.target.value;
    this.selectedConcept = value;
  }
  addYear($event) {
    var value = $event.target.value;
    this.selectedYear = value;
  }
  addSellOption(sell) {
    // var value = $event.target.value;
    this.selectedSellOption = sell;
    console.log(this.selectedSellOption)
  }
  addReplicaOrder(rep) {
    // var value = $event.target.value;
    this.selectedReplica = rep;
    console.log(this.selectedReplica)
  }
  addEduOption(edu) {
    // var value = $event.target.value;
    this.selectedEduOption = edu;
    console.log(this.selectedEduOption)
  }
  addSchool($event) {
    var value = $event.target.value;
    this.selectedSchool = value;
  }
  addCertificate($event) {
    var value = $event.target.value;
    this.selectedCertificate = value;
  }
  addEduYear($event) {
    var value = $event.target.value;
    this.selectedEduYear = value;
  }


  publish() {
    // A post entry.
    var postData = {
      artWorkType: this.selectedType,
      imageURL: this.selectedImageURL,
      title: this.selectedTitle,
      category: this.selectedCategory,
      concept: this.selectedConcept,
      height: this.selectedHeight,
      width: this.selectedWidth,
      sellOption: this.selectedSellOption,
      replicaOrder: this.selectedReplica
    };
    // Get a key for a new Post.
    this.database.list(`artWork/`).push(postData).then(() => {
      this.selectedType = '',
        this.selectedImageURL = '',
        this.selectedTitle = '',
        this.selectedCategory = '',
        this.selectedConcept = '',
        this.selectedHeight = '',
        this.selectedWidth = '',
        this.selectedSellOption = '',
        this.selectedReplica = ''
    })
    this.toastr.success('Post is Done!');
  }

  educationForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    certificate: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required])
  });

  publishEducation() {
    console.log("baal")
    this.educationForm.markAllAsTouched();
    if (this.educationForm.valid) {
      this.database.list(`users/${this.user.uid}/education`).push(this.educationForm.value).then(() => {
        this.educationForm.reset()
        this.toastr.success('Added New Education/ Training Information.');
      }).catch(() => {
        this.toastr.error('Cannot add information at this moment. Please try again later.');
      })
    } else {
      this.toastr.error('Please add all the information.');
    }
  }

  editEducation(education, field, newValue) {
    this.database.list(`users/${this.user.uid}/education`).update(education.key, {[field]: newValue})
  }
  
  deleteEducation(education) {
    this.database.list(`users/${this.user.uid}/education/${education.key}`).remove().then(() => {
      this.toastr.success('Successfully removed Education/ Training Information.');
    }).catch(() => {
      this.toastr.error('Cannot remove information at this moment. Please try again later.');
    })
  }
}
