import { AlertService } from './../../services/alert.service';
import { DashboardService } from '../../services/dashboard.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'garp-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  formContact: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    $(document).ready(function () {
      $('.phone_with_ddd').mask('(00) 0 0000-0000');
    });

    this.formContact = this.formBuilder.group({
      name: null,
      email: null,
      cellphone: null,
      text: null
    })
  }

  new(){
    this.dashboardService.create(this.formContact.value).subscribe(response=>{
      this.alertService.show('success',"Mensagem Enviada!")
      this.formContact.reset()
    },error=>{
      this.alertService.show('danger',"Ops,Desculpe tente novamente mais tarde!")
    })
  }

}
