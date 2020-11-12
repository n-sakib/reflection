import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArtistAuthenticationComponent } from './artist/artist-authentication/artist-authentication.component';
import { ArtistDashboardComponent } from './artist/artist-dashboard/artist-dashboard.component';
import { OverviewComponent } from './profile/overview/overview.component';
import { AuthComponent } from './profile/auth/auth.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { CartComponent } from './profile/cart/cart.component';
import { OrderSequenceComponent } from './profile/order-sequence/order-sequence.component';
import { ExhibitionComponent } from './exhibition/exhibition.component';
import { PaintingsListComponent } from './paintings/paintings-list/paintings-list.component';
import { PaintingsDetailsComponent } from './paintings/paintings-details/paintings-details.component';
import { ArtistsListComponent } from './artists/artists-list/artists-list.component';
import { ArtistsDetailsComponent } from './artists/artists-details/artists-details.component';
import { PhotoToArtComponent } from './photomaniputation/photo-to-art/photo-to-art.component';
import { ArtReproductionComponent } from './photomaniputation/art-reproduction/art-reproduction.component';
import { FaqComponent } from './compliance/faq/faq.component';
import { PrivacyPolicyComponent } from './compliance/privacy-policy/privacy-policy.component';
import { TosComponent } from './compliance/tos/tos.component';
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistAuthenticationComponent,
    ArtistDashboardComponent,
    OverviewComponent,
    AuthComponent,
    AboutComponent,
    ContactComponent,
    ReviewsComponent,
    CartComponent,
    OrderSequenceComponent,
    ExhibitionComponent,
    PaintingsListComponent,
    PaintingsDetailsComponent,
    ArtistsListComponent,
    ArtistsDetailsComponent,
    PhotoToArtComponent,
    ArtReproductionComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    TosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
