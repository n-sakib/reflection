import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageComponentComponent } from '../image-component/image-component.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { GalleryTypeComponent } from '../gallery-type/gallery-type.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CoreService } from '../service/core.service';



@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {
  srcResult;
  frame: string;
  imgSrc: string = './assets/featured.jpeg';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  showFiller = true;
  galleries  = [];
  images  = [];
  displayedColumnsTesti: string[] = ['userName', 'description', 'rating', 'address', 'email'];
  displayedColumnsGalleries: string[] = ['galleryName' , 'galleryType'];
  //displayedColumnsImages: string[] = ['galleryName' , 'title', 'artist', 'description', 'medium', 'orientation', 'price' , 'size', 'frame'];
  dataSourceTesti = this.core.testimonials$;
  displayedColumnsImages: string[] = ['galleryName' , 'description', 'title', 'artist', 'orientation' , 'frame', 'size', 'price', 'medium'];
  dataSourceGalleries;
  dataSourceImages;
  galleryImgs = [];
  
  

  controls: FormArray;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(private storage: AngularFireStorage, public dialog: MatDialog, private database: AngularFireDatabase, public dialogRef: MatDialog, private core: CoreService) {
  
   
  }

  ngOnInit() {

    this.core.testimonials$.subscribe((testis) => {
      const toGroups = testis.map(element => {  
        return new FormGroup({
          userName: new FormControl(element.userName, Validators.required),
          descripion: new FormControl(element.descripion, Validators.required),
          rating: new FormControl(element.rating, Validators.required),
          address: new FormControl(element.address, Validators.required),
          email: new FormControl(element.email, Validators.required)
        });
      })
      this.controls = new FormArray(toGroups);  
    })
    console.log(this.dataSourceTesti)

    this.database.list('galleries/').snapshotChanges()
      .subscribe({
        next: galleries => {

          galleries.forEach(gallery => {
            var val =gallery.payload.val();
            this.galleries.push(val);
          });
          this.dataSourceGalleries = new MatTableDataSource(this.galleries);
          // console.log(this.galleries)
        }
      })
    
      this.database.list('images/').snapshotChanges()
      .subscribe({
        next: images => {
          images.forEach(image => {
            var val =image.payload.val();
            Object.keys(val).forEach((demo: any) => {
              var imageObject: any = {
                galleryName: [],
                title: [],
                description: [],
                artist: [],
                medium: [],
                orientation: [],
                price: [],
                size: [],
                frame: [],
               
              };
              imageObject.type = image.key;
              let galleryName = val[demo].galleryName;
              let artist = val[demo].artist;
              let title = val[demo].title;
              let description = val[demo].description;
              let medium = val[demo].medium;
              let orientation = val[demo].orientation;
              let price = val[demo].price;
              let size = val[demo].size;
              let frame = val[demo].frame;
              
              imageObject.description.push(description);
              imageObject.galleryName.push(galleryName);
              imageObject.artist.push(artist);
              imageObject.title.push(title);
              imageObject.medium.push(medium);
              imageObject.orientation.push(orientation);
              imageObject.price.push(price);
              imageObject.size.push(size);
              imageObject.frame.push(frame);
              //this.dataSourceImages = new MatTableDataSource(imageObject);
              this.galleryImgs.push(imageObject);
            })
            
            // this.dataSourceImages = new MatTableDataSource(this.galleryImgs);
          });
          console.log(this.galleryImgs)
          this.dataSourceImages = new MatTableDataSource(this.galleryImgs);
        }
      })


  }


  


  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(ImageComponentComponent, {
      width: '100%', height: '90%',
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log("Closed", data);
    })

  }


  openTestimonial(): void {
    const dialogRef = this.dialog.open(TestimonialComponent, {
      width: '100%', height: '85%',
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log("Closed", data);
    })
  }
  openGalleryType(): void {
    const dialogRef = this.dialog.open(GalleryTypeComponent, {
      width: '100%', height: '85%',
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log("Closed", data);
    })
  }


  updateField(index, field) {
    console.log(index)
    console.log(field)
    const control = this.getControl(index, field);
    if (control.valid) {
      this.core.update(index, field, control.value);
    }

  }

  getControl(index, fieldName) {
    // console.log(fieldName)
    const a = this.controls.at(index).get(fieldName) as FormControl;
    // console.log(fieldName)
    return this.controls.at(index).get(fieldName) as FormControl;
  }
}
