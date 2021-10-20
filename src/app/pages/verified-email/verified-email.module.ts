import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifiedEmailComponent } from './verified-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [VerifiedEmailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: VerifiedEmailComponent }])
  ]
})
export class VerifiedEmailModule { }
