import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { NgImageSliderModule, NgImageSliderComponent } from 'ng-image-slider';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaidPictureComponent } from '../paid-picture/paid-picture.component';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Observable, combineLatest } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {
  SwiperComponent,
  SwiperDirective,
  SwiperConfigInterface,
  SwiperScrollbarInterface,
  SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { types } from 'util';
import { finalize } from 'rxjs/operators';


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
  galleryOptions: NgxGalleryOptions[];
  singleGalleryOptions: NgxGalleryOptions[];
  breakpoint;
  galleryTypes = [];
  images = [];
 
  public show: boolean = true;
  galleryImgs = [];


  public slides = [
    ['assets/Cover.jpeg'],
    'assets/featured.jpeg',
    'assets/featured(1).jpeg',
  ];
  public slideVideo = [
    'https://player.vimeo.com/video/20412632?color=ffffff&byline=0&portrait=0',
    'https://www.youtube.com/watch?v=L6ZJaKqALgM',
  ];

  public config_thumbs = {
    a11y: true,
    direction: 'horizontal',
    observer: true,
    spaceBetween: 10,
    slideToClickedSlide: true,
    slidesPerView: 4.5,
    slidesOffsetBefore: 5,
    slidesOffsetAfter: 5,
    simulateTouch: true,
    resistanceRatio: 0.6,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    navigation: {
      nextEl: '.carousel__arrow--prev',
      prevEl: '.carousel__arrow--next'
    },
    autoplay: {
      delay: 2000,
    },
    pagination: true,
    speed: 100,
    effect: 'slide',
    grabCursor: true,
    loop: true,
    breakpoints: {
      // when window width is <= 1024px
      1024: {
        slidesPerView: 5.5
      }
    }
  };

  public config_gallery = {
    a11y: true,
    effect: 'slide',
    loop: true,
    initialSlide: 0,
    thumbs: {
      swiper: this.slides
    },
    spaceBetween: 0,
    simulateTouch: true,
    preloadImages: false,
    observer: true,
    lazy: {
      loadPrevNext: false,
      loadOnTransitionStart: true,
    },
    zoom: {
      maxRatio: 5
    }
  };

  imgSrc: string = '';
  selectedImage: any = null;
  userProfileImg: '';
  imageTypes: Observable<any[]>;

  public type: string = 'component';

  public disabled: boolean = false;
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    autoplay: {
      delay: 2000,
    },
    pagination: false,
    speed: 1000,
    navigation: {
      nextEl: '.btn-Left',
      prevEl: '.btn-Right',
    },
    effect: 'slide',
    grabCursor: true,
    loop: true,
  }

  // public slides = [
  //   'First slide',
  //   'Second slide',
  //   'Third slide',
  //   'Fourth slide',
  //   'Fifth slide',
  //   'Sixth slide'
  // ];




  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: true }) directiveRef?: SwiperDirective;
  

  constructor(private dialog: MatDialog, private database: AngularFireDatabase) {
    // this.setImageObject();
  }




  ngOnInit() {
    this.database.list('images/').snapshotChanges()
    .subscribe({
      next: images => {
        
        images.forEach(imageType => {
          var imageObject:any = {};
          imageObject.images = [];
          imageObject.type = imageType.key;
          var val = imageType.payload.val();
          Object.keys(val).forEach((image:any) => {
            imageObject.images.push({
            small: val[image].imageURL,
            medium: val[image].imageURL,
            big: val[image].imageURL})
          }); 
          this.galleryImgs.push(imageObject)
         
        });
        console.log(this.galleryImgs);
      },
      error: err => console.error('something wrong occurred: ' + err),
      complete: () => { console.log("done") }
    })
  

    this.breakpoint = (window.innerWidth <= 920) ? 1 : 2;
    this.galleryOptions = [
      // {
      //   width: '600px',
      //   height: '400px',
      //   thumbnailsColumns: 4,
      //   arrowPrevIcon: 'fa fa-chevron-left',
      //   arrowNextIcon: 'fa fa-chevron-right',
      //   imageAnimation: NgxGalleryAnimation.Slide,
      //   imageActions: [{ icon: 'fa fa-window-restore', onClick: this.imageOnClick1.bind(this), titleText: 'view' }],
      //   preview: false,
      //   imageDescription: true
      // },
      {
        width: '600px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide,
        imageActions: [{ icon: 'fa fa-window-restore', onClick: this.imageOnClick1.bind(this), titleText: 'view' }],
        preview: false,
        imageDescription: true
      },
      { "breakpoint": 1080, "width": "400px", "height":"280px", "thumbnailsColumns": 4 },
      { "breakpoint": 1280, "width": "500px" },
      { "breakpoint": 920, "width": "640px", "height":"480px", "thumbnailsColumns": 4 },
      { "breakpoint": 720, "width": "500px", "height":"400px", "thumbnailsColumns": 4 },
      { "breakpoint": 640, "width": "400px", "height":"370px", "thumbnailsColumns": 4 },
      { "breakpoint": 520, "width": "350px", "height":"350px", "thumbnailsColumns": 4 },
    ];

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
  


  compareAndCreate = () => {
    console.log("here")
    console.log(this.galleryTypes)
    if (this.images != []) {
      this.images.forEach(image => {
        if (this.galleryTypes.indexOf(image.galleryName) > -1) {

        }
      });
    }
  }

  onChangeHandler() {
    this.setImageObject();
    this.showSlider = false;
    setTimeout(() => {
      this.showSlider = true;
    }, 10);
  }
  setImageObject() {

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

  imageOnClick1(event,index):void {
    console.log(index)  
    const dialogRef = this.dialog.open(PaidPictureComponent, {
      
      width: '100%', height: '70%',
    });dialogRef.componentInstance.galleryImgs=this.galleryImgs
  }

  deleteImage(event, index): void {
    console.log("here")
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <920) ? 1 : 2;
  }

  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleDirection(): void {
    this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
  }

  public toggleSlidesPerView(): void {
    if (this.config.slidesPerView !== 1) {
      this.config.slidesPerView = 1;
    } else {
      this.config.slidesPerView = 2;
    }
  }

  public toggleOverlayControls(): void {
    if (this.config.navigation) {
      this.config.scrollbar = false;
      this.config.navigation = false;

      this.config.pagination = this.pagination;
    } else if (this.config.pagination) {
      this.config.navigation = false;
      this.config.pagination = false;

      this.config.scrollbar = this.scrollbar;
    } else {
      this.config.scrollbar = false;
      this.config.pagination = false;

      this.config.navigation = true;
    }

    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.setIndex(0);
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.setIndex(0);
    }
  }

  public toggleKeyboardControl(): void {
    this.config.keyboard = !this.config.keyboard;
  }

  public toggleMouseWheelControl(): void {
    this.config.mousewheel = !this.config.mousewheel;
  }

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }
}
