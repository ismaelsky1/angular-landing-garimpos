import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayComponent } from './pay.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const maskOptions: Partial<IConfig> = {
  thousandSeparator: '.',
  decimalMarker: ','
};


@NgModule({
  declarations: [PayComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //FlatpickrModule.forRoot(),
    NgxMaskModule.forRoot(maskOptions),
    RouterModule.forChild([{ path: '', component: PayComponent }])
  ]
})
export class PayModule { }
