import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'garp-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.scss']
})
export class ValidateAccountComponent implements OnInit {

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
    private _location: Location
  ) { }

  // ngOnInit() {



  //   //let id = this.route.snapshot.paramMap.get('id');


  //   // this.recovery_code = this.route.paramMap.pipe(
  //   //   switchMap( (params: ParamMap) => { 
  //   //     return console.log(params.get('recovery_code'))
  //   // })
  //   // );
  // }




  ngOnInit(): void {
    $(document).ready(function () {

    });

    this.formSignIn = this.formBuilder.group({
      password: null,
      confirm_password: null,
      recovery_code: null,
    })
  }

  onSubmit() {
    // this.authenticationService.login(this.formSignIn.value).subscribe(response => {
    //   console.log(response)
    //   this.router.navigate(['/'])
    // }, error => {
    //   this.isAlert = true;
    //   this.styleAlert = "alert-danger";
    //   this.titleAlert = "Error";
    //   this.messageAlert = error.message;
    // })

  }
}
