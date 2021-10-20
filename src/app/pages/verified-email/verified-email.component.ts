import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'garp-verified-email',
  templateUrl: './verified-email.component.html',
  styleUrls: ['./verified-email.component.scss']
})
export class VerifiedEmailComponent implements OnInit {

  confirmed: boolean = false;
  error: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {   
    this.userService.verifiedEmail(this.route.snapshot.params.id).subscribe(responde=>{
      this.confirmed = true
    },error=>{
      this.error = error.message
    })
  }

}
