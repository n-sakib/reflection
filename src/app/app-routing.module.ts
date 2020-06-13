import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import HomeComponent  from './home/home.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminpanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
