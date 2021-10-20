
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'garp-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formSignIn: FormGroup;
  alert: any = {
    isAlert: false,
    styleAlert: "alert-danger",
    titleAlert: "Error",
    messageAlert: "Usuário ou senha incorreto !"
  }

  dataParams: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.dataParams = params
    })

    $(document).ready(function () {

    });

    this.formSignIn = this.formBuilder.group({
      email: null,
      password: null,
      type: "CANDIDATE"
    })
  }

  onSubmit() {
    this.authenticationService.login(this.formSignIn.value).subscribe(response => {
      console.log(response)
      if (this.dataParams.redirect) {
        this.router.navigate(["/" + this.dataParams.redirect + this.dataParams.redirectId], { queryParams: { subscription: true } })
      }else{
        this.router.navigate(["/"])

      }
    }, error => {
      this.alert.isAlert = true;
      this.alert.styleAlert = "alert-danger";
      this.alert.titleAlert = "Error";
      this.alert.messageAlert = error.message;
    })

  }

  recover() {
    this.router.navigate(['/forgot-password'])
  }
  submitEmail(){
    this.router.navigate(['/submit-verified-email'])
  }

}
