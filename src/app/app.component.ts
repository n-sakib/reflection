import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgImageSliderModule, NgImageSliderComponent } from 'ng-image-slider';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
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
  constructor(private dialog: MatDialog, public router: Router) {
    console.log(this.router.url)
    this.setImageObject();
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
}
