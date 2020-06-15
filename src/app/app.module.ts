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
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ImageComponentComponent } from './image-component/image-component.component';
import { MatDialog } from '@angular/material/dialog';
import { PaidPictureComponent } from './paid-picture/paid-picture.component';
import { DigitalPictureComponent } from './digital-picture/digital-picture.component';
import { PotraitPictureComponent } from './potrait-picture/potrait-picture.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminpanelComponent,
    ImageComponentComponent,
    PaidPictureComponent,
    DigitalPictureComponent,
    PotraitPictureComponent
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ImageComponentComponent, PaidPictureComponent, DigitalPictureComponent, PotraitPictureComponent]

})
export class AppModule { }

