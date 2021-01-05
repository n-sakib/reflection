import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { url } from 'inspector';

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
  selectedTypeNote = '';
  imagePreview = ''
  selectedEduOption = '';
  selectedTitleWorkshop = '';
  selectedSubjectWshop = '';
  selectedSupWshop = '';
  selectedOrgWshop = '';
  selectedLocWshop = '';
  selectedYearWshop = '';
  selectedWshopImgURL = '';
  selectedCaptionWshop = '';
  imageUploadPercentage: Observable<number>;
  isWshopImgSubmitting: boolean = false;
  file = {
    type: ''
  };

  public media1Lists: any[] = [{ value: 'Oil Paint on Canvas' }, { value: 'Oil Paint on Board' }, { value: 'Acrylic Paint on Canvas' }, { value: 'Acrylic Paint on Paper' },
  { value: 'Acrylic Paint on Board' }, { value: 'Watercolor on Paper' }, { value: 'Poster Color on Paper' }, { value: 'Graphite Pencil on Paper' }, { value: 'Charcoal on Paper' }, { value: 'Other Media' }];
  public media2Lists: any[] = [{ value: 'Oil Paint on Canvas' }, { value: 'Oil Paint on Board' }, { value: 'Acrylic Paint on Canvas' }, { value: 'Acrylic Paint on Paper' }, { value: 'Woodcut' }, { value: 'Lithography' },
  { value: 'Acrylic Paint on Board' }, { value: 'Watercolor on Paper' }, { value: 'Poster Color on Paper' }, { value: 'Graphite Pencil on Paper' }, { value: 'Charcoal on Paper' }, { value: 'Other Media' }];

  educations = [];
  showEducations = [];
  workshops = [];


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
            });
          }
        })
      this.database.list(`users/${this.user.uid}/workshop`).snapshotChanges()
        .subscribe({
          next: workshops => {
            this.workshops = []
            workshops.forEach(workshop => {
              let val = workshop.payload.val();
              val['key'] = workshop.key;
              this.workshops.push(val);
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
        console.log(this.selectedImageURL)
        // this.isImageSubmitted = true
      }
    }
  }

  onWshopImgSelected(event) {
    this.isWshopImgSubmitting = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); //64
      this.file = event.target.files[0];
      console.log(this.file)
      reader.onload = (event: any) => {
        this.selectedWshopImgURL = event.target.result;
      }
    }
  }

  addTitle($event) {
    var value = $event.target.value;
    this.selectedTitle = value;
  }

  addType($event) {
    var value = $event.target.value;
    this.selectedType = value;
  }
  addCategory($event) {
    var value = $event.target.value;
    this.selectedCategory = value;
    console.log(this.selectedCategory)
  }
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
  addNote($event) {
    var value = $event.target.value;
    this.selectedTypeNote = value;
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

  publish() {
    // A post entry.
    var postData = {
      artWorkType: this.selectedType,
      artTypeNote: this.selectedTypeNote,
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
        this.selectedTypeNote = '',
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
    console.log(postData)
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
    this.database.list(`users/${this.user.uid}/education`).update(education.key, { [field]: newValue })
  }

  deleteEducation(education) {
    this.database.list(`users/${this.user.uid}/education/${education.key}`).remove().then(() => {
      this.toastr.success('Successfully removed Education/ Training Information.');
    }).catch(() => {
      this.toastr.error('Cannot remove information at this moment. Please try again later.');
    })
  }

  workshopForm = new FormGroup({
    workshopTitle: new FormControl('', [Validators.required]),
    workshopSubject: new FormControl('', [Validators.required]),
    workshopSuperviser: new FormControl('', [Validators.required]),
    workshopOrg: new FormControl('', [Validators.required]),
    workshopLoc: new FormControl('', [Validators.required]),
    workshopYear: new FormControl('', [Validators.required]),
    workshopImgCaption: new FormControl('', [Validators.required]),
    workshopImg: new FormControl(''),
  });

  publishWorkshop() {
    console.log("baal")
    this.workshopForm.markAllAsTouched();
    if (this.workshopForm.valid) {
      this.database.list(`users/${this.user.uid}/workshop`).push(this.workshopForm.value).then((workshop) => {
        if (this.selectedWshopImgURL !== null) {
          const filePath = `${new Date().getTime()}`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(`users/${this.user.uid}/workshops/${workshop.key}/main`, this.file, {'contentType': this.file.type});
          task.percentageChanges().subscribe((res) => {
          })
          var downloadURL = fileRef.getDownloadURL();
          console.log(downloadURL)
          // downloadURL.getDownloadURL().then(url =>{
          //   // Insert url into an <img> tag to "download"
          //   this.workshopForm.controls['workshopImg'].setValue(url);
          //   console.log(url)
          // })
          // console.log(downloadURL)
          // this.workshopForm.controls['workshopImg'].setValue(downloadURL);
        }
        this.workshopForm.reset()
        this.toastr.success('Added New Workshop Information.');
      }).catch(() => {
        this.toastr.error('Cannot add information at this moment. Please try again later.');
      })

      //storage bucket e save korbi
      // storage bucket theke download url ber korbi
      // db te download url ta shoho nicher data gula save korbi
      //this.workshopForm.controls['workshopImg'].setValue(selected.id);


    } else {
      this.toastr.error('Please add all the information.');
    }
  }

  editWorkshop(workshop, field, newValue) {
    this.database.list(`users/${this.user.uid}/workshop`).update(workshop.key, { [field]: newValue })
  }

  deleteWorkshop(workshop) {
    this.database.list(`users/${this.user.uid}/workshop/${workshop.key}`).remove().then(() => {
      this.toastr.success('Successfully removed Workshop Information.');
    }).catch(() => {
      this.toastr.error('Cannot remove information at this moment. Please try again later.');
    })
  }
}
