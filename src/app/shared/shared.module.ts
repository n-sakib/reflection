import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryFooterComponent } from './footers/primary-footer/primary-footer.component';
import { SecondaryFooterComponent } from './footers/secondary-footer/secondary-footer.component';
import { PrimaryHeaderComponent } from './headers/primary-header/primary-header.component';
import { PrimaryLayoutComponent } from './layouts/primary-layout/primary-layout.component';
import { SecondaryLayoutComponent } from './layouts/secondary-layout/secondary-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PrimaryFooterComponent,
    SecondaryFooterComponent,
    PrimaryHeaderComponent,
    PrimaryLayoutComponent,
    SecondaryLayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
