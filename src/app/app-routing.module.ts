import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import HomeComponent  from './home/home.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { BuypaintingsComponent } from './buypaintings/buypaintings.component';
import { BuyDetailsComponent } from './buy-details/buy-details.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminpanelComponent },
  { path: 'buypaintings', component: BuypaintingsComponent},
  { path: 'buyDetails', component: BuyDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
