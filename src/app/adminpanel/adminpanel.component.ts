import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ImageComponentComponent } from '../image-component/image-component.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { GalleryTypeComponent } from '../gallery-type/gallery-type.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {CoreService} from '../service/core.service';



@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {
  srcResult;
  frame: string;
  imgSrc: string ='./assets/featured.jpeg';
  selectedImage :any = null;
  isSubmitted: boolean = false;
  showFiller = true;
  testimonials = [];
  displayedColumns: string[] = ['name', 'description','rating', 'address', 'email'];
  dataSource;
  demo=this.core.list$;
 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private storage: AngularFireStorage, public dialog: MatDialog, private database: AngularFireDatabase, public dialogRef: MatDialog, private core: CoreService) { 
  
  }

  ngOnInit(){

  
   console.log(this.demo)

    this.database.list('testimonials/').snapshotChanges()
      .subscribe({
        next: testimonials => {

          testimonials.forEach(testimonials => {
            var testiObject: any = {
            };
             var val = testimonials.payload.val();
            this.testimonials.push(val);  
          });
          this.dataSource = new MatTableDataSource(this.testimonials);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
         
          // console.log(this.testimonials)
        },
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => { console.log("done") }
      })

    }

  
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


openDialog(): void {
    const dialogRef = this.dialog.open(ImageComponentComponent, {
      width: '100%',height: '90%',
    });
    dialogRef.afterClosed().subscribe(data=>{
      console.log("Closed",data);
  })
   
  }

  openTestimonial(): void {
    const dialogRef = this.dialog.open(TestimonialComponent, {
      width: '100%',height: '85%',
    });
    dialogRef.afterClosed().subscribe(data=>{
      console.log("Closed",data);
  })
  }
  openGalleryType(): void {
    const dialogRef = this.dialog.open(GalleryTypeComponent, {
      width: '100%',height: '85%',
    });
    dialogRef.afterClosed().subscribe(data=>{
      console.log("Closed",data);
  })
  }
}
