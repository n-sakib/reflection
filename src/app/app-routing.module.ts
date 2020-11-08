import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }  from './home/home.component';
import { ArtistAuthenticationComponent }  from './artist/artist-authentication/artist-authentication.component';
import { ArtistDashboardComponent } from './artist/artist-dashboard/artist-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artist/login', component: ArtistAuthenticationComponent },
  { path: 'artist/dashboard', component: ArtistDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
