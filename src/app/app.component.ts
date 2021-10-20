import { environment } from './../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component, OnInit, OnChanges, AfterContentInit, AfterContentChecked } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import { CadidateService } from './services/cadidate.service';

@Component({
  selector: 'garp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {


  title = 'website';
  isLogin: any;
  avatar: string = '';

  imgUrl = environment.url;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private candidaterService: CadidateService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
      let nav = document.getElementById('navbarCollapse');
      nav.classList.remove('show');

    });
    this.getUser();
  }
  ngAfterContentChecked() {
    this.isLogin = this.authenticationService.getTokenValue();
    if (this.isLogin) {
      this.isLogin = jwt_decode(this.isLogin);
    }
  }

  getUser() {
    this.isLogin = this.authenticationService.getTokenValue();
    if (this.isLogin) {
      this.isLogin = jwt_decode(this.isLogin);

      this.candidaterService.getCandidate(this.isLogin.person_id).subscribe((response) => {
        this.avatar = this.imgUrl + response.avatar

        console.log( this.avatar)
      });
    }
  }

  logout() {
    this.authenticationService.logout()
  }





}
