import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
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

  iswshopImageUploaded: boolean = false;
  frameUploadPercentage: Observable<number>;
  isImageUploaded: boolean = false;
  iswhopAlbumUploaded: boolean = false;
  isArtcampAlbumUploaded: boolean = false;
  isartcampImageUploaded: boolean = false;
  isExhibitionImageUploaded: boolean = false;
  isExhibitionAlbumUploaded: boolean = false;
  user = {
    email: '',
    photoURL: '',
    displayName: '',
    uid: ''
  };
  isWshopImgSubmitting: boolean = false;
  file = {
    type: ''
  };

  artworkFormPage = 1;
  artworks = [];
  educations = [];
  showEducations = [];
  workshops = [];
  artcamps = [];
  medias = [];
  artworkImagePreview = '';
  artWorkImage;
  showArtworkEditModal = false;
  wshopImagePreview = '';
  wshopImage;
  wshopAlbum = [];
  wshopAlbumPreview = '';
  wshopAlbumImage = '';
  artcampAlbumPreview = '';
  artcampImagePreview = '';
  wshopAlbumPhoto = [];
  artcampImage;
  artcampAlbumImage = '';
  artcampAlbum = [];
  artcampAlbumPhoto = [];
  exhibitionAlbum =[];
  wshopImgAls = [];
  artcampImgAls = [];
  exhibitionImagePreview = '';
  exhibitionAlbumPreview = '';
  exhibitionAlbumImage = '';
  exhibitionImage;
  exhibitions = [];
  exhibitionAlbumPhoto =[];
  exhibitionImgAls = [];


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
              this.database.list(`users/${this.user.uid}/workshop/${workshop.key}/album/`).snapshotChanges()
                .subscribe({
                  next: wshopImgAls => {
                    this.wshopImgAls = []
                    wshopImgAls.forEach(wshopImgAl => {
                      let val = wshopImgAl.payload.val();
                      this.wshopImgAls.push(val);
                      console.log(this.wshopImgAls)
                    });
                  }
                })
            });
          }
        })
      this.database.list(`users/${this.user.uid}/artcamp`).snapshotChanges()
        .subscribe({
          next: artcamps => {
            this.artcamps = []
            artcamps.forEach(artcamp => {
              let val = artcamp.payload.val();
              val['key'] = artcamp.key;
              this.artcamps.push(val);
              this.database.list(`users/${this.user.uid}/artcamp/${artcamp.key}/album/`).snapshotChanges()
              .subscribe({
                next: artcampImgAls => {
                  this.artcampImgAls = []
                  artcampImgAls .forEach(artcampImgAl => {
                    let val = artcampImgAl.payload.val();
                    this.artcampImgAls.push(val);
                    console.log(this.artcampImgAls )
                  });
                }
              })
            });
          }
        })
      this.database.list(`users/${this.user.uid}/exhibition`).snapshotChanges()
        .subscribe({
          next: exhibitions => {
            this.exhibitions = []
            exhibitions.forEach(exhibition => {
              let val = exhibition.payload.val();
              val['key'] = exhibition.key;
              this.exhibitions.push(val);
              this.database.list(`users/${this.user.uid}/exhibition/${exhibition.key}/album/`).snapshotChanges()
              .subscribe({
                next: exhibitionImgAls => {
                  this.exhibitionImgAls = []
                  exhibitionImgAls.forEach(exhibitionImgAl => {
                    let val = exhibitionImgAl.payload.val();
                    this.exhibitionImgAls.push(val);
                    console.log(this.exhibitionImgAls)
                  });
                }
              })
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


  fetchMedia(media) {
    this.database.list(`admin/forms/artwork/media/${media}`).query.once("value").then((media) => this.medias = media.val())
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
      if (this.artworkImagePreview !== null) {
        const filePath = `users/${this.user.uid}/artwork/${artwork.key}/${this.artWorkImage.name}`
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.artWorkImage, { 'contentType': this.artWorkImage.type })
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().toPromise().then((url) => {
              this.database.list(`users/${this.user.uid}/artwork/`).update(artwork.key, { artWorkImage: url })
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

  openArtwork(artwork) {
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
    title: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    superviser: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    caption: new FormControl('', [Validators.required]),
    wshopImage: new FormControl(''),
  });

  onWshopImgSelected(event) {
    this.iswshopImageUploaded = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.wshopImagePreview = event.target.result;
      }
    }
    this.wshopImage = event.target.files[0];
  }

  onWshopAlbumSelected(event) {
    this.iswhopAlbumUploaded = true;
    console.log("baal1")
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.wshopAlbumPreview = event.target.result;
      }
    }
    this.wshopAlbumImage = event.target.files[0];
    // this.wshopAlbum.push(event.target.files[0]);
  }

  publishWorkshop() {
    this.workshopForm.markAllAsTouched();
    if (this.workshopForm.valid) {
      this.database.list(`users/${this.user.uid}/workshop`).push(this.workshopForm.value).then((workshop) => {
        if (this.wshopImagePreview !== null) {
          const filePath = `users/${this.user.uid}/workshop/${workshop.key}/main`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(`users/${this.user.uid}/workshop/${workshop.key}/main`, this.wshopImage, { 'contentType': this.wshopImage.type });
          task.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().toPromise().then((url) => {
                this.database.list(`users/${this.user.uid}/workshop`).update(workshop.key, { wshopImage: url })
                this.toastr.success('Added New Workshop.');
              })
            })
          )
            .subscribe()
        }
        if (this.wshopAlbumPreview !== null) {
          this.wshopAlbum.forEach(image => {
            const filePath = `users/${this.user.uid}/workshop/${workshop.key}/album/`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(filePath, image, { 'contentType': image.type });
            task.snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL().toPromise().then((url) => {
                  this.database.list(`users/${this.user.uid}/workshop/${workshop.key}/album/`).push(url)
                  this.toastr.success('Added New Workshop Photo.');
                })
              })
            ).subscribe()
          })
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
  uploadWshopAlbum() {
    if (this.wshopAlbumPreview !== null) {
      this.wshopAlbum.push(this.wshopAlbumImage)
      console.log(this.wshopAlbum)
      this.toastr.success('Successfully added Photo.');
      this.iswhopAlbumUploaded = false;
    }
  }

  showAlbum() {
    this.wshopAlbumPhoto = [];
    if (this.wshopAlbum !== null) {
      console.log(this.wshopAlbum)
      this.wshopAlbum.forEach(image => {
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (event: any) => {
          var val = event.target.result;
          this.wshopAlbumPhoto.push(val)
        }
      })
    }
  }

  // artcamp

  artcampForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    gallery: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    artcampImage: new FormControl(''),
  });

  onArtcampImgSelected(event) {
    this.isartcampImageUploaded = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.artcampImagePreview = event.target.result;
      }
    }
    this.artcampImage = event.target.files[0];
  }

  onArtcampAlbumSelected(event) {
    this.isArtcampAlbumUploaded = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.artcampAlbumPreview = event.target.result;
      }
    }
    this.artcampAlbumImage = event.target.files[0];
  }

  publishArtcamp() {
    this.artcampForm.markAllAsTouched();
    if (this.artcampForm.valid) {
      this.database.list(`users/${this.user.uid}/artcamp`).push(this.artcampForm.value).then((artcamp) => {
        if (this.artcampImagePreview !== null) {
          const filePath = `users/${this.user.uid}/artcamp/${artcamp.key}/main`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, this.artcampImage, { 'contentType': this.artcampImage.type });
          task.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().toPromise().then((url) => {
                this.database.list(`users/${this.user.uid}/artcamp`).update(artcamp.key, { artcampImage: url })
              })
            })
          )
            .subscribe()
        }
        if (this.artcampAlbumPreview !== null) {
          this.artcampAlbum.forEach(image => {
            const filePath = `users/${this.user.uid}/artcamp/${artcamp.key}/album/`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(filePath, image, { 'contentType': image.type });
            task.snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL().toPromise().then((url) => {
                  this.database.list(`users/${this.user.uid}/artcamp/${artcamp.key}/album/`).push(url)
                  this.toastr.success('Added New Photo.');
                })
              })
            ).subscribe()
          })
        }
        this.artcampForm.reset()
        this.toastr.success('Added New Artcamp Information.');
      }).catch(() => {
        this.toastr.error('Cannot add information at this moment. Please try again later.');
      })
    } else {
      this.toastr.error('Please add all the information.');
    }
  }

  editArtcamp(artcamp, field, newValue) {
    this.database.list(`users/${this.user.uid}/artcamp`).update(artcamp.key, { [field]: newValue })
  }

  deleteArtcamp(artcamp) {
    this.database.list(`users/${this.user.uid}/artcamp/${artcamp.key}`).remove().then(() => {
      this.toastr.success('Successfully removed Artcamp Information.');
    }).catch(() => {
      this.toastr.error('Cannot remove information at this moment. Please try again later.');
    })
  }

  uploadArtcampAlbum() {
    if (this.artcampAlbumPreview !== null) {
      this.artcampAlbum.push(this.artcampAlbumImage)
      console.log(this.artcampAlbum)
      this.toastr.success('Successfully added Photo.');
      this.isArtcampAlbumUploaded = false;
    }
  }

  showArtcampAlbum() {
    this.artcampAlbumPhoto = [];
    if (this.artcampAlbum !== null) {
      console.log(this.artcampAlbum)
      this.artcampAlbum.forEach(image => {
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (event: any) => {
          var val = event.target.result;
          this.artcampAlbumPhoto.push(val)
        }
      })
    }
  }

  // exhibitionForm
  exhibitionForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    gallery: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    exhibitionImage: new FormControl(''),
  });

  onExhibitionImgSelected(event) {
    this.isExhibitionImageUploaded = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.exhibitionImagePreview = event.target.result;
      }
    }
    this.exhibitionImage = event.target.files[0];
  }

  onExhibitionAlbumSelected(event) {
    this.isExhibitionAlbumUploaded = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.exhibitionAlbumPreview = event.target.result;
      }
    }
    this.exhibitionAlbumImage = event.target.files[0];
  }

  publishExhibition() {
    this.exhibitionForm.markAllAsTouched();
    if (this.exhibitionForm.valid) {
      this.database.list(`users/${this.user.uid}/exhibition`).push(this.exhibitionForm.value).then((exhibition) => {
        if (this.exhibitionImagePreview !== null) {
          const filePath = `users/${this.user.uid}/exhibition/${exhibition.key}/main`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, this.exhibitionImage, { 'contentType': this.exhibitionImage.type });
          task.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().toPromise().then((url) => {
                this.database.list(`users/${this.user.uid}/exhibition`).update(exhibition.key, { exhibitionImage: url })
                this.toastr.success('Added New Exhibition.');
              })
            })
          )
            .subscribe()
        }
        if (this.exhibitionAlbumPreview !== null) {
          this.exhibitionAlbum.forEach(image => {
            const filePath = `users/${this.user.uid}/exhibition/${exhibition.key}/album/`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(filePath, image, { 'contentType': image.type });
            task.snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL().toPromise().then((url) => {
                  this.database.list(`users/${this.user.uid}/exhibition/${exhibition.key}/album/`).push(url)
                  this.toastr.success('Added New Photo.');
                })
              })
            ).subscribe()
          })
        }
        this.exhibitionForm.reset()
        this.toastr.success('Added New Exhibition Information.');
      }).catch(() => {
        this.toastr.error('Cannot add information at this moment. Please try again later.');
      })
    } else {
      this.toastr.error('Please add all the information.');
    }
  }

  editExhibiton(exhibition, field, newValue) {
    this.database.list(`users/${this.user.uid}/exhibition`).update(exhibition.key, { [field]: newValue })
  }

  deleteExhibition(exhibition) {
    this.database.list(`users/${this.user.uid}/exhibition/${exhibition.key}`).remove().then(() => {
      this.toastr.success('Successfully removed Exhibition Information.');
    }).catch(() => {
      this.toastr.error('Cannot remove information at this moment. Please try again later.');
    })
  }

  uploadExhibitionAlbum() {
    if (this.exhibitionAlbumPreview !== null) {
      this.exhibitionAlbum.push(this.exhibitionAlbumImage)
      console.log(this.exhibitionAlbum)
      this.toastr.success('Successfully added Photo.');
      this.isExhibitionAlbumUploaded = false;
    }
  }

  showExhibitionAlbum() {
    this.exhibitionAlbumPhoto = [];
    if (this.exhibitionAlbum !== null) {
      console.log(this.exhibitionAlbum)
      this.exhibitionAlbum.forEach(image => {
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (event: any) => {
          var val = event.target.result;
          this.exhibitionAlbumPhoto.push(val)
        }
      })
    }
  }
}
