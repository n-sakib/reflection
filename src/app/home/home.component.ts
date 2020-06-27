import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderModule, NgImageSliderComponent } from 'ng-image-slider';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaidPictureComponent } from '../paid-picture/paid-picture.component';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export default class HomeComponent implements OnInit{

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
  galleryOptions: NgxGalleryOptions[];
  singleGalleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  breakpoint;
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };
  public slides = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];

  constructor(private dialog: MatDialog) {
    this.setImageObject();
  }


  

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide,
        imageActions: [{icon: 'fa fa-window-restore', onClick: this.imageOnClick1.bind(this), titleText: 'view'}],
        preview: false,
        imageDescription: true
      },
{ "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
{ "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ];

    this.singleGalleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
          small: 'assets/Cover.jpeg',
          medium: 'assets/Cover.jpeg',
          big: 'assets/Cover.jpeg'
      },
      {
          small: 'assets/Cover.jpeg',
          medium: 'assets/Cover.jpeg',
          big: 'assets/Cover.jpeg'
      },
      {
          small: 'assets/Cover.jpeg',
          medium: 'assets/Cover.jpeg',
          big: 'assets/Cover.jpeg'
      }
  ];
  }
  onChangeHandler() {
    this.setImageObject();
    this.showSlider = false;
    setTimeout(() => {
      this.showSlider = true;
    }, 10);
  }
  setImageObject() {
    this.imageObject = [{
      image: 'assets/Cover.jpeg',
      thumbImage: 'assets/Cover.jpeg',
      title: 'NAME 1',
    },
    {
      image: 'assets/Cover.jpeg',
      thumbImage: 'assets/Cover.jpeg',
      title: 'NAME 2',
    },
    {
      image: 'assets/Cover.jpeg',
      thumbImage: 'assets/Cover.jpeg',
      title: 'NAME 3',
    },
    {
      image: 'assets/Cover.jpeg',
      thumbImage: 'assets/Cover.jpeg',
      title: 'NAME 4',
    },
    {
      image: 'assets/Cover.jpeg',
      thumbImage: 'assets/Cover.jpeg',
      title: 'NAME 5',
    },
    {
      image: 'assets/Cover.jpeg',
      thumbImage: 'assets/Cover.jpeg',
      title: 'NAME 6',
    }];
  }
  imageOnClick(index) {
    console.log('index', index);


  }

  arrowOnClick(event) {
    console.log('arrow click event', event);
  }

  lightboxArrowClick(event) {
    console.log('popup arrow click', event);
  }

  prevImageClick() {
    this.ds.prev();
  }

  nextImageClick() {
    this.ds.next();
  }

  imageOnClick1(): void {
    const dialogRef = this.dialog.open(PaidPictureComponent, {
      width: '100%', height: '90%',
    });
  }

  deleteImage(event, index): void {
    console.log("here")
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth < 900) ? 1: 2;
  }

  
}
