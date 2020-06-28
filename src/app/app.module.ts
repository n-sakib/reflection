import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import HomeComponent from './home/home.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgImageSliderComponent } from 'ng-image-slider';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ImageComponentComponent } from './image-component/image-component.component';
import { MatDialog } from '@angular/material/dialog';
import { PaidPictureComponent } from './paid-picture/paid-picture.component';
import { DigitalPictureComponent } from './digital-picture/digital-picture.component';
import { PotraitPictureComponent } from './potrait-picture/potrait-picture.component'
import { TestimonialComponent } from './testimonial/testimonial.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';



const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminpanelComponent,
    ImageComponentComponent,
    PaidPictureComponent,
    DigitalPictureComponent,
    PotraitPictureComponent,
    TestimonialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    FormsModule,
    FlexLayoutModule,
    NgImageSliderModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NgxGalleryModule,
    SwiperModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ImageComponentComponent, PaidPictureComponent, DigitalPictureComponent, PotraitPictureComponent, TestimonialComponent]

})
export class AppModule { }

