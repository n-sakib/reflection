import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { PrimaryLayoutComponent } from './shared/layouts/primary-layout/primary-layout.component';
import { SecondaryLayoutComponent } from './shared/layouts/secondary-layout/secondary-layout.component';

const routes: Routes = [
  {
    path: '', component: PrimaryLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'artist/dashboard', component: ArtistDashboardComponent },
      { path: 'user/dashboard', component: OverviewComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order', component: OrderSequenceComponent },
      { path: 'exhibitions', component: ExhibitionComponent },
      { path: 'paintings', component: PaintingsListComponent },
      { path: 'paintings/:id', component: PaintingsDetailsComponent },
      { path: 'artists', component: ArtistsListComponent },
      { path: 'artists/:id', component: ArtistsDetailsComponent },
      { path: 'photo-to-art', component: PhotoToArtComponent },
      { path: 'art-reproduction', component: ArtReproductionComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'privacy', component: PrivacyPolicyComponent },
      { path: 'tos', component: TosComponent },
    ]
  },
  {
    path: 'login', component: SecondaryLayoutComponent,
    children: [
      { path: 'artist', component: ArtistAuthenticationComponent },
      { path: 'user', component: AuthComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
