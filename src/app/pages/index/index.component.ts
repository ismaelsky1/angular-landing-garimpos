import { DashboardService } from './../../services/dashboard.service';
import { SubscriptionService } from './../../services/subscription.service';
import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CityService } from 'src/app/services/city.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'garp-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  listjob: any = [];
  listCity: any = [];
  dashboard: any;

  searchForm : FormGroup;

  constructor(
    private jobService: JobService,
    private subscriptionService: SubscriptionService,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) { 

    this.searchForm = this.formBuilder.group({
      city_id: null,
      title: null
    })

  }

  ngOnInit(): void {
    $(document).ready(function () {

    });
    // $('#sonhos').click(function () {
    //   alert('we call alert from JQuery');
    // })

    this.getjobs()
    this.showCite()
    this.getDashboard()
  }

  getjobs(){
    this.jobService.index().subscribe(response =>{
      this.listjob = response.data
    })
  }

  getDashboard(){
    this.dashboardService.cardNumbers().subscribe(response =>{
      this.dashboard = response
    })
  }

  showCite(){
    this.cityService.getCitys().subscribe(response=>{
      this.listCity = response.data
    })
  }

  onSubmit(){
    this.router.navigate(['search'],{queryParams: this.searchForm.value})
  }
}
