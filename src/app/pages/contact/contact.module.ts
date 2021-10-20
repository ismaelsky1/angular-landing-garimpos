import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';



@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //FlatpickrModule.forRoot(),
    RouterModule.forChild([{ path: '', component: ContactComponent }])
  ]
})
export class ContactModule { }
