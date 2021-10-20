import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as jwt_decode from 'jwt-decode'
import { notEqual } from 'assert';

declare var $: any;

@Component({
  selector: 'garp-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  token: any;
  recovery_code: any;

  recoveryForm: FormGroup;
  alterForm: FormGroup;

  isAlert: boolean = false;
  styleAlert: string = "alert-danger";
  titleAlert: string = "Error";
  messageAlert: string = "Usuário ou senha incorreto !"


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private _location: Location,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.token = this.authenticationService.getTokenValue()
    if (!this.token) {
      this.recovery_code = this.route.snapshot.params.recovery_code
    }else{
      this.token = jwt_decode(this.token)
    }

    this.alterForm = this.formBuilder.group({
      current_password: null,
      password: null,
      confirm_password: null
    })

    this.recoveryForm = this.formBuilder.group({
      recovery_code: ['changer', Validators.required],
      password: null,
      confirm_password: null
    })

  }

  alterPassword() {
    if (this.alterForm.get('password').value !== this.alterForm.get('confirm_password').value) {
      this.alterForm.controls.confirm_password.setErrors(notEqual)
    } else {
      this.userService.alterPassword(this.token.id,this.alterForm.value).subscribe(response => {

        this.isAlert = true;
        this.styleAlert = "alert-success";
        this.titleAlert = "Concluido";
        this.messageAlert = "Senha Alterada!";

        setTimeout(() => {
          this.router.navigate(['/'])
        }, 2000);
      }, error => {
        this.isAlert = true;
        this.styleAlert = "alert-danger";
        this.titleAlert = "Error";
        this.messageAlert = error.message;
      })

    }
  }

  recoveryPassword() {
    if (this.recoveryForm.get('password').value !== this.recoveryForm.get('confirm_password').value) {
      this.recoveryForm.controls.confirm_password.setErrors(notEqual)
    } else {

      this.recoveryForm.controls.recovery_code.setValue(this.recovery_code)
      this.authenticationService.recoverPassword(this.recoveryForm.value).subscribe(response => {
        
        this.isAlert = true;
        this.styleAlert = "alert-success";
        this.titleAlert = "Concluido";
        this.messageAlert = "Senha Alterada!";

        this.recoveryForm.controls.recovery_code.setErrors(notEqual)

        setTimeout(() => {
          this.router.navigate(['/'])
        }, 3000);
  
      }, error => {
        this.isAlert = true;
        this.styleAlert = "alert-danger";
        this.titleAlert = "Error";
        this.messageAlert = error.message;
      })
    }

  }

}
