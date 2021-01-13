import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-artist-dashboard',
  templateUrl: './artist-dashboard.component.html',
  styleUrls: ['./artist-dashboard.component.scss']
})
export class ArtistDashboardComponent implements OnInit {

  isImageSubmitting: boolean = false;
  frameUploadPercentage: Observable<number>;
  isImageUploaded: boolean = false;
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

  artworkFormPage = 1;
  artworks = [];
  educations = [];
  showEducations = [];
  workshops = [];
  medias = [];
  artworkImagePreview = '';
  artWorkImage;
  showArtworkEditModal = false;

  constructor(private toastr: ToastrService, private storage: AngularFireStorage, private database: AngularFireDatabase, private afAuth: AngularFireAuth, public auth: AuthService) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      this.database.list(`users/${this.user.uid}/artwork`).snapshotChanges()
        .subscribe({
          next: artworks => {
            this.artworks = []
            artworks.forEach(artworks => {
              let val = artworks.payload.val();
              val['key'] = artworks.key;
              this.artworks.push(val);
              console.log(this.artworks)
            });
          }
        })
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

  fetchMedia(media) {
    this.database.list(`admin/forms/artwork/media/${media}`).query.once("value").then((media) => this.medias = media.val())
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

  /*
  Artwork Functions
  */
  artworkForm = new FormGroup({
    artWorkImage: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    media: new FormControl('', [Validators.required]),
    mediaDetails: new FormControl(''),
    height: new FormControl('', [Validators.required]),
    width: new FormControl('', [Validators.required]),
    concept: new FormControl(''),
    isForSell: new FormControl('', [Validators.required]),
    price: new FormControl(''),
    replica: new FormControl(''),
    demandPrice: new FormControl(''),
    originalTermsAccepted: new FormControl('', [Validators.required]),
    replicaTermsAccepted: new FormControl('', [Validators.required]),
  });

  onArtworkImageSelected(event) {
    this.isImageUploaded = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.artworkImagePreview = event.target.result;
      }
    }
    this.artWorkImage = event.target.files[0];
  }

  changeFormPage(page) {
    if (page === 2) {
      if (this.artworkForm.value.artWorkImage &&
        this.artworkForm.value.type,
        this.artworkForm.value.title,
        this.artworkForm.value.year,
        this.artworkForm.value.media,
        this.artworkForm.value.height,
        this.artworkForm.value.width
      ) {
        this.artworkFormPage = 2
      } else {
        this.toastr.error('Please add all the required Info');
      }
    } else if (page === 3) {
      if (this.artworkForm.value.isForSell) {
        this.artworkFormPage = 3
      } else {
        this.toastr.error('Please add all the required Info');
      }
    } else {
      this.artworkFormPage = 1
    }
  }

  publishArtwork() {
    this.database.list(`users/${this.user.uid}/artwork`).push(this.artworkForm.value).then((artwork) => {
      if (this.selectedWshopImgURL !== null) {
        const filePath = `users/${this.user.uid}/artwork/${artwork.key}/${this.artWorkImage.name}`
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.artWorkImage, { 'contentType': this.artWorkImage.type })
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().toPromise().then((url)=> {
              this.database.list(`users/${this.user.uid}/artwork/`).update(artwork.key, {artWorkImage: url})
              this.educationForm.reset()
              this.toastr.success('Added New Artwork.');
            })
          })
        )
        .subscribe()
      }
     
    }).catch(() => {
      this.toastr.error('Cannot add information at this moment. Please try again later.');
    })
  }

  openArtwork (artwork) {
    console.log('here')
    this.showArtworkEditModal = true;
  }

  educationForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    certificate: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required])
  });


  publishEducation() {
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
          const task = this.storage.upload(`users/${this.user.uid}/workshops/${workshop.key}/main`, this.file, { 'contentType': this.file.type });
          task.percentageChanges().subscribe((res) => {
          })
          var downloadURL = fileRef.getDownloadURL();
        }
        this.workshopForm.reset()
        this.toastr.success('Added New Workshop Information.');
      }).catch(() => {
        this.toastr.error('Cannot add information at this moment. Please try again later.');
      })
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
