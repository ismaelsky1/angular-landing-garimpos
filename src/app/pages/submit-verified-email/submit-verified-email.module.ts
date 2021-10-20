import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitVerifiedEmailComponent } from './submit-verified-email.component';



@NgModule({
  declarations: [SubmitVerifiedEmailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: SubmitVerifiedEmailComponent }])
  ]
})
export class SubmitVerifiedEmailModule { }
