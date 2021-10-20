import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferDetailComponent } from './offer-detail.component';



@NgModule({
  declarations: [OfferDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: OfferDetailComponent }])
  ]
})
export class OfferDetailModule { }
