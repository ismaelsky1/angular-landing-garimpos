import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from './candidate.component';
//import 'flatpickr/dist/flatpickr.css';
//import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const maskOptions: Partial<IConfig> = {
  thousandSeparator: '.',
  decimalMarker: ','
};
@NgModule({
  declarations: [CandidateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //FlatpickrModule.forRoot(),
    NgxMaskModule.forRoot(maskOptions),
    RouterModule.forChild([{ path: '', component: CandidateComponent }])
  ],
  providers: [NgxImageCompressService],
})
export class CandidateModule { }
