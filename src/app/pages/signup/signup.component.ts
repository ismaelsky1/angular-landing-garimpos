import { Router } from '@angular/router';
import { CadidateService } from './../../services/cadidate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'garp-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSignUp: FormGroup;
  isInvalid: boolean = false;
  isRegistered: boolean = false;

  alert: any = { isAlert: false, styleAlert: 'alert', titleAlert: "Error", messageAlert: "Usuário ou senha incorreto !" }

  constructor(
    private formBuilder: FormBuilder,
    private cadidateService: CadidateService,
    private router: Router
  ) { }



  ngOnInit(): void {
    $(document).ready(function () {
      $('.phone_with_ddd').mask('(00) 0 0000-0000');
    });

    this.formSignUp = this.formBuilder.group({
      name: null,
      cellphone: null,
      email: null,
      password: null,
      ValidatePassword: null,
      terms: null,
      type: "CANDIDATE"
    })
  }

  onSubmit() {

    if (this.formSignUp.get('password').value == this.formSignUp.get('ValidatePassword').value) {

      this.formSignUp.controls.cellphone.setValue(this.formSignUp.get('cellphone').value.replace(/\D+/g, ''));

      this.cadidateService.registerCandidate({ name: this.formSignUp.get('name').value, cellphone: this.formSignUp.get('cellphone').value, email: this.formSignUp.get('email').value, password: this.formSignUp.get('password').value, type: this.formSignUp.get('type').value }).subscribe(response => {
        this.isRegistered = true;
      }, error => {
        this.alert.isAlert = true;
        this.alert.styleAlert = "alert-danger";
        this.alert.titleAlert = "Error";
        this.alert.messageAlert = error.message;
      })

    } else {
      this.isInvalid = true;
      this.isRegistered = false;
    }


  }

  ngAfterContentChecked() {


  }

}
