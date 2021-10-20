import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var $: any;

@Component({
  selector: 'garp-submit-verified-email.',
  templateUrl: './submit-verified-email.component.html',
  styleUrls: ['./submit-verified-email.component.scss']
})
export class SubmitVerifiedEmailComponent implements OnInit {

    recovery_code: any;
  
    formVerified: FormGroup;
    isAlert: boolean = false;
    styleAlert: string = "alert-danger";
    titleAlert: string = "Error";
    messageAlert: string = "Usuário ou senha incorreto !"
  
  
    constructor(
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private router: Router,
      private _location: Location,
      private authenticationService: AuthenticationService
    ) { }
  
  
    ngOnInit(): void {
      $(document).ready(function () {
  
      });  
      this.formVerified = this.formBuilder.group({
        email: null
      })
    }
  
    onSubmit() {
      this.authenticationService.sendMailVerification(this.formVerified.get('email').value).subscribe(response => {
        console.log(response)
        this.isAlert = true;
        this.styleAlert = "alert-success";
        this.titleAlert = "Concluido";
        this.messageAlert = "Email enviado para "+ this.formVerified.get('email').value;

      }, error => {
        this.isAlert = true;
        this.styleAlert = "alert-danger";
        this.titleAlert = "Error";
        this.messageAlert = error.message;
      })
  
    }
    back(){
      this._location.back();
    }
  
  }
