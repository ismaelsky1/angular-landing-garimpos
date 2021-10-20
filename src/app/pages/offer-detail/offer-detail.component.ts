import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubscriptionService } from './../../services/subscription.service';
import { JobService } from './../../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

declare var $: any;

@Component({
  selector: 'garp-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  formSignUp: FormGroup;
  idJob: string;
  dataJob: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private subscriptionService: SubscriptionService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.idJob = params.id;      
      this.getJob(this.idJob)
    })
    this.route.queryParams.subscribe(params => {
      if(params.subscription == "true"){
        this.subscribe(this.idJob)
      }
    })

    

    this.formSignUp = this.formBuilder.group({
      name: null,
      phone: null,
      email: null,
      password: null,
      validatorPassword: null
    })
  }

  onSubmit() {
    alert(JSON.stringify(this.formSignUp.value))
  }

  getJob(idJob) {
    this.jobService.show(this.idJob).subscribe(response => {
      this.dataJob = response
      console.log( this.dataJob)
    })
  }

  subscribe(idJob = this.dataJob.id) {
    let tokem: any = this.authenticationService.getTokenValue()
    if (!tokem) {
      return this.router.navigate(['/signin'], { queryParams: { redirect: "offer-detail/", redirectId: this.dataJob.id } })
    }

    tokem = jwt_decode(tokem)
    this.subscriptionService.subscription(tokem.person_id, idJob).subscribe(response => {
      $('#modal_success').modal('toggle')
    }, error => {
      $('#modal_danger').modal('toggle')
      console.log(error)
    })



  }


}
