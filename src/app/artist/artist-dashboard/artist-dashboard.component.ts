import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
    displayName: ''
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
  isWshopImgSubmitting: boolean = false;

  public media1Lists: any[] = [{ value: 'Oil Paint on Canvas' }, { value: 'Oil Paint on Board' }, { value: 'Acrylic Paint on Canvas' }, { value: 'Acrylic Paint on Paper' },
  { value: 'Acrylic Paint on Board' }, { value: 'Watercolor on Paper' }, { value: 'Poster Color on Paper' }, { value: 'Graphite Pencil on Paper' }, { value: 'Charcoal on Paper' }, { value: 'Other Media' }];
  public media2Lists: any[] = [{ value: 'Oil Paint on Canvas' }, { value: 'Oil Paint on Board' }, { value: 'Acrylic Paint on Canvas' }, { value: 'Acrylic Paint on Paper' }, { value: 'Woodcut' }, { value: 'Lithography' },
  { value: 'Acrylic Paint on Board' }, { value: 'Watercolor on Paper' }, { value: 'Poster Color on Paper' }, { value: 'Graphite Pencil on Paper' }, { value: 'Charcoal on Paper' }, { value: 'Other Media' }];

  educations = [];
  showEducations = [];
  workshops =[];


  constructor(private toastr: ToastrService, private storage: AngularFireStorage, private database: AngularFireDatabase, private afAuth: AngularFireAuth, public auth: AuthService) { }

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user => {
      this.user = user;
      console.log(this.user)
      console.log(this.user.photoURL)
    });

    this.database.list('artistEducation/').snapshotChanges()
      .subscribe({
        next: educations => {
          educations.forEach(educations => {
            var val = educations.payload.val();
            this.educations.push(val);
          });
        }
    })

    this.database.list('artistWorkshop/').snapshotChanges()
      .subscribe({
        next: workshops => {
          workshops.forEach(workshops => {
            var val = workshops.payload.val();
            this.workshops.push(val);
            // console.log(this.workshops)
          });
        }
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
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.selectedWshopImgURL= event.target.result;
        console.log(this.selectedWshopImgURL)
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
  addTitleWshop($event){
    var value = $event.target.value;
    this.selectedTitleWorkshop = value;
  }
  addSubjectWshop($event){
    var value = $event.target.value;
    this.selectedSubjectWshop = value;
  }
  addSuperviserWshop($event){
    var value = $event.target.value;
    this.selectedSupWshop = value;
  }
  addOrgWshop($event){
    var value = $event.target.value;
    this.selectedOrgWshop = value;
  }
  addLocWshop($event){
    var value = $event.target.value;
    this.selectedLocWshop = value;
  }
  addYearWshop($event){
    var value = $event.target.value;
    this.selectedYearWshop = value;
  }
  addCaptionWshop($event){
    var value = $event.target.value;
    this.selectedCaptionWshop = value;
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

  publishEducation() {
    // A post entry.
    var postEduData = {
      eduSchoolType: this.selectedEduOption,
      schoolName: this.selectedSchool,
      certificateName: this.selectedCertificate,
      degreeYear: this.selectedEduYear
    };

    // console.log(postEduData)
    // Get a key for a new Post.
    this.database.list(`artistEducation/`).push(postEduData).then(() => {
      this.selectedEduOption = '',
        this.selectedCertificate = '',
        this.selectedEduYear = '',
        this.selectedSchool = ''
    })
    this.toastr.success('Post is Done!');
  }

  publishWshop() {
    // A post entry.
    var postWshopData = {
      workshopTitle: this.selectedTitleWorkshop,
      workshopSubject: this.selectedSubjectWshop,
      workshopSuperviser: this.selectedSupWshop,
      workshopOrg: this.selectedOrgWshop,
      workshopLoc: this.selectedLocWshop,
      workshopYear: this.selectedYearWshop,
      workshopImgCaption: this.selectedCaptionWshop,
      workshopImg: this.selectedWshopImgURL
    };

    // console.log(postEduData)
    // Get a key for a new Post.
    this.database.list(`artistWorkshop/`).push(postWshopData).then(() => {
      this.selectedTitleWorkshop = '',
        this.selectedSubjectWshop = '',
        this.selectedSupWshop = '',
        this.selectedOrgWshop = '',
        this.selectedLocWshop = '',
        this.selectedYearWshop = '',
        this.selectedCaptionWshop = ''
    })
    this.toastr.success('Post is Done!');
  }

}
