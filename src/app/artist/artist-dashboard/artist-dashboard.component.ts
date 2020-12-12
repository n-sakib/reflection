import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
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
  selectedType  = '';
  selectedCategory = '';
  selectedHeight = '';
  selectedWidth = '';
  selectedConcept = '';
  imagePreview = ''
  public mediaLists: any[] = [{ value: 'Dual' }, { value: 'Single'}];

  constructor(private toastr: ToastrService, private storage: AngularFireStorage, private database: AngularFireDatabase,private afAuth: AngularFireAuth, public auth: AuthService) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      console.log(this.user)
    });
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async onImageSelected() {
    console.log((<HTMLInputElement>document.getElementById('imageFile')).files[0]);
    // this.imagePreview=
    const file = (<HTMLInputElement>document.getElementById('imageFile')).files[0];
    this.toBase64(file).then(() => {
      const filePath = `${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            var downloadURL = fileRef.getDownloadURL();
            downloadURL.subscribe(url => {
              this.isImageSubmitted = true;
              this.selectedImageURL = url;
            
            })
          })
        )
        .subscribe();
    })
  }

  addTitle($event) {
    var value = $event.target.value;
    this.selectedTitle = value;
  }
  
  addType($event) {
    var value = $event.target.value;
    this.selectedType = value;
  }
  addCategory($event){
    var value = $event.target.value;
    this.selectedCategory = value;
  }
  addHeight($event){
    var value = $event.target.value;
    this.selectedHeight = value;
  }
  addWidth($event){
    var value = $event.target.value;
    this.selectedWidth = value;
  }
  addConcept($event){
    var value = $event.target.value;
    this.selectedConcept = value;
  }

  publish() {
    // A post entry.
    var postData = {
      artWorkType: this.selectedType,
      imageURL: this.selectedImageURL,
      title: this.selectedTitle,
      category: this.selectedCategory,
      concept:  this.selectedConcept,
      height:  this.selectedHeight,
      width: this.selectedWidth ,
    };

    console.log(postData)
    // Get a key for a new Post.
    this.database.list(`images/`).push(postData).then(() => {
        this.selectedType = '',
        this.selectedImageURL = '',
        this.selectedTitle = '',
        this.selectedCategory='',
        this.selectedConcept= '',
        this.selectedHeight= '',
        this.selectedWidth  = ''
    })
    this.toastr.success('Post is Done!');
  }

}
