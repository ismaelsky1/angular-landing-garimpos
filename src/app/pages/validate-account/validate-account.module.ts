import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateAccountComponent } from './validate-account.component';


@NgModule({
  declarations: [ValidateAccountComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ValidateAccountComponent }])
  ],
  exports: [ValidateAccountComponent]
})
export class ValidateAccountModule { }
