import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { MatDialog } from '@angular/material/dialog';
import { PaidPictureComponent } from '../paid-picture/paid-picture.component';
import { NgxGalleryOptions, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface, SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { ShowTestimonialsComponent } from '../show-testimonials/show-testimonials.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export default class HomeComponent implements OnInit {

  @ViewChild('nav', { static: false }) ds: NgImageSliderComponent;
  title = 'Reflection';
  showSlider = true;
  sliderWidth: Number = 940;
  sliderImageWidth: Number = 250;
  sliderImageHeight: Number = 200;
  sliderArrowShow: Boolean = true;
  sliderInfinite: Boolean = false;
  sliderImagePopup: Boolean = true;
  sliderAutoSlide: Boolean = false;
  sliderSlideImage: Number = 1;
  sliderAnimationSpeed: any = 1;
  imageObject: Array<object> = [];
  galleryOptions: any;
  singleGalleryOptions: NgxGalleryOptions[];
  breakpoint;
  galleryTypes = [];
  testimonials = [];
  images = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  public show: boolean = true;
  galleryImgs = [];

  imgSrc: string = '';
  selectedImage: any = null;
  userProfileImg: '';
  imageTypes: Observable<any[]>;

  public type: string = 'component';

  public disabled: boolean = false;
  public config: SwiperConfigInterface;

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: true }) directiveRef?: SwiperDirective;


  constructor(private dialog: MatDialog, private database: AngularFireDatabase) {
    // this.setImageObject();
  }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '600px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide,
        imageActions: [{ icon: 'fa fa-window-restore', titleText: 'view' }],
        preview: false,
        imageDescription: true
      },
      { "breakpoint": 1080, "width": "400px", "height": "280px", "thumbnailsColumns": 4 },
      { "breakpoint": 1280, "width": "500px" },
      { "breakpoint": 920, "width": "640px", "height": "480px", "thumbnailsColumns": 4 },
      { "breakpoint": 720, "width": "500px", "height": "400px", "thumbnailsColumns": 4 },
      { "breakpoint": 640, "width": "400px", "height": "370px", "thumbnailsColumns": 4 },
      { "breakpoint": 520, "width": "350px", "height": "350px", "thumbnailsColumns": 4 },
    ];

    this.database.list('images/').snapshotChanges()
      .subscribe({
        next: images => {

          images.forEach(imageType => {
            var imageObject: any = {
              images: [],
              frameURL: [],
              description: []
            };
            imageObject.type = imageType.key;
            var val = imageType.payload.val();
            Object.keys(val).forEach((image: any) => {
              imageObject.images.push({
                small: val[image].imageURL,
                medium: val[image].imageURL,
                big: val[image].imageURL
              })
              let frameURL = val[image].frameURL;
              let description = val[image].description;

              imageObject.frameURL.push(frameURL);
              imageObject.description.push(description);
            });
            
            imageObject.galleryOptions = [
              {
                width: '600px',
                thumbnailsColumns: 4,
                arrowPrevIcon: 'fa fa-chevron-left',
                arrowNextIcon: 'fa fa-chevron-right',
                imageAnimation: NgxGalleryAnimation.Slide,
                imageActions: [{ icon: 'fa fa-window-restore', titleText: 'view', onClick: this.imageOnClick.bind(this, imageType.key) }],
                preview: false,
                imageDescription: true
              },
              { "breakpoint": 1080, "width": "400px", "height": "280px", "thumbnailsColumns": 4 },
              { "breakpoint": 1280, "width": "500px" },
              { "breakpoint": 920, "width": "640px", "height": "480px", "thumbnailsColumns": 4 },
              { "breakpoint": 720, "width": "500px", "height": "400px", "thumbnailsColumns": 4 },
              { "breakpoint": 640, "width": "400px", "height": "370px", "thumbnailsColumns": 4 },
              { "breakpoint": 520, "width": "350px", "height": "350px", "thumbnailsColumns": 4 },
            ];
            this.galleryImgs.push(imageObject)
          });
        },
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => { console.log("done") }
      })

      this.database.list('testimonials/').snapshotChanges()
    .subscribe({
      next: testimonials => {
        
        testimonials.forEach( testimonials=> {
          var testiObject:any = {};
          
          var val = testimonials.payload.val();
          this.testimonials.push(val);
          this.config = {
            a11y: true,
            direction: 'horizontal',
            slidesPerView: 1,
            keyboard: true,
            navigation: true,
            pagination: false,
            autoplay: {
              delay: 2000,
            },
          }
        });
        
        }
      })

    this.breakpoint = (window.innerWidth <= 920) ? 1 : 2;


    this.singleGalleryOptions = [
      {
        breakpoint: 400,
        width: '80%',
        height: '150px',
        imagePercent: 65,
        thumbnailsPercent: 18,
        thumbnailsMargin: 5,
        thumbnailMargin: 5,
      },
      {
        breakpoint: 600,
        width: '100%',
        height: '200px',
        imagePercent: 85,
        thumbnailsPercent: 20,
        thumbnailsMargin: 5,
        thumbnailMargin: 5,
      },
      {
        breakpoint: 960,
        width: '100%',
        height: '250px',
        imagePercent: 75,
        thumbnailsPercent: 25,
        thumbnailsMargin: 5,
        thumbnailMargin: 5,
      },
      {
        breakpoint: 1280,
        width: '100%',
        height: '250px',
        imagePercent: 75,
        thumbnailsPercent: 25,
        thumbnailsMargin: 5,
        thumbnailMargin: 5,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  onChangeHandler() {
    this.showSlider = false;
    setTimeout(() => {
      this.showSlider = true;
    }, 10);
  }

  imageOnClick(type, event, index) {
    let imageInfo = {
      imageURL: "",
      frameURL: "",
      description: "",
      galleryName: ""
    };
    this.galleryImgs.forEach(gallery => {
      if(gallery.type === type) {
        imageInfo.imageURL = gallery.images[index];
        imageInfo.frameURL = gallery.frameURL[index];
        imageInfo.description = gallery.description[index];
        imageInfo.galleryName = type
      }
    });
    const dialogRef = this.dialog.open(PaidPictureComponent, {
      width: '100%', height: '70%',
    }); 
    dialogRef.componentInstance.imageInfo = imageInfo;
  }

  prevImageClick() {
    this.ds.prev();
  }

  nextImageClick() {
    this.ds.next();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth < 920) ? 1 : 2;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  showtTestimonial(imageURL) {
    let testiInfo = {
      imageURL: "",
    };
    this.testimonials.forEach(testimonial => {
      
        testiInfo.imageURL = imageURL;
      
    });
    const dialogRef = this.dialog.open( ShowTestimonialsComponent, {
      width: '80%', height: '50%',
    });
    dialogRef.componentInstance.testiInfo = testiInfo;
  }

}