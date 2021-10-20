import { AlertService } from './../../services/alert.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkhourService } from './../../services/workhour.service';
import { SalaryService } from './../../services/salary.service';
import { JobService } from './../../services/job.service';
import { StateService } from './../../services/state.service';
import { CityService } from './../../services/city.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'garp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  listCitys: any;
  listStates: any;
  listJobs: any;
  listSalarys: any;
  listWorkhours: any;

  searchForm: FormGroup;

  isLoading: boolean = true;
  params: any;
  currentPage: number = 1;
  lastPage: number;

  constructor(
    private cityService: CityService,
    private stateService: StateService,
    private jobService: JobService,
    private salaryService: SalaryService,
    private workhourService: WorkhourService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.params = this.route.snapshot.queryParams

    this.searchForm = this.formBuilder.group({
      title: this.params.title,
      city_id: this.params.city_id,
      state_id: null,
      salary_id: null,
      work_hour_id: null 
    })    
    //this.searchForm.reset();

    // if(this.params.city_id || this.params.title){
    //   this.getJobs(this.params);
    // }else{
    //   
    // }
    this.getJobs();
    this.getCitys();
    this.getStates();
    this.getSalarys();
    this.getWorkHours();
  }

  getJobs(page = this.currentPage) {
    
    this.isLoading = true;
    this.jobService.index(this.searchForm.value,page).subscribe(response => {
      this.listJobs = response.data

      this.isLoading = false;
      this.currentPage = page
      this.lastPage = response.last_page;

    },error=>{
      this.alertService.show('danger',error.message)
    })
  }

  getCitys() {
    this.cityService.getCitys().subscribe(response=>{
      this.listCitys = response.data
    })
  }

  getStates() {
    this.stateService.getStates().subscribe(response=>{
      this.listStates = response.data     
    })
  }

  getSalarys() {
    this.salaryService.getSalarys().subscribe(response=>{
      this.listSalarys = response.data 
    })
  }

  getWorkHours() {
    this.workhourService.getWorkHours().subscribe(response=>{
      this.listWorkhours = response.data 
    })
  }

  onSubmit(){
    let data = this.searchForm.value
    if(data.city_id){
      data.state_id = null
    }
    this.getJobs(data)
  }

}
