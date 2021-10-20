import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var $: any;

@Component({
  selector: 'garp-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    recovery_code: any;
  
    formSignIn: FormGroup;
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
      this.formSignIn = this.formBuilder.group({
        email: null
      })
    }
  
    onSubmit() {
      this.authenticationService.forgotPassword(this.formSignIn.get('email').value).subscribe(response => {
        console.log(response)
        this.isAlert = true;
        this.styleAlert = "alert-success";
        this.titleAlert = "Concluido";
        this.messageAlert = "Email enviado para "+ this.formSignIn.get('email').value;

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
