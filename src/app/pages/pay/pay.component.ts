import { CheckoutService } from './../../services/checkout.service';
import { AlertService } from './../../services/alert.service';
import { CandidateRewardService } from './../../services/candidate-reward.service';
import { CityService } from './../../services/city.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { CadidateService } from './../../services/cadidate.service';
import { DatePipe, formatDate } from '@angular/common';
declare var $: any;
declare var DirectCheckout: any;
declare var Swal: any;

@Component({
  selector: 'garp-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
  //providers: [DatePipe]
})
export class PayComponent implements OnInit {
  package: any;
  token: any;
  checkOutForm: FormGroup;
  candidate: any;

  citys: any;
  formPaymente: string = "BOLETO";
  today: any = new Date();

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private candidateService: CadidateService,
    private cityService: CityService,
    private candidateRewardService: CandidateRewardService,
    private alertService: AlertService,
    private checkoutService: CheckoutService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    $(document).ready(function () {
      $('.cep').mask('00000-000');
      $('.phone_with_ddd').mask('(00) 0 0000-0000');
      $('.cpf').mask('000.000.000-00', { reverse: true });
      $('.dt_venc').mask('00/0000', { reverse: true });
    });



    this.token = this.authenticationService.getTokenValue()
    this.token = jwt_decode(this.token)

    this.checkOutForm = this.formBuilder.group({
      candidate_id: null,
      type: "BOLETO",
      quantity: null,
      description: null,

      name: null,
      email: null,
      street: null,
      document: null,
      zipcode: null,
      city: null,
      district: null,
      complement: null,
      number: null,
      reference: null,

      fullName: null,
      numberCard: null,
      dateVenc: null,
      cvv: null
    })

    this.route.queryParams.subscribe(params => {
      this.package = params;
      this.checkOutForm.controls['type'].setValue("CREDIT")
      this.checkOutForm.controls['quantity'].setValue(parseInt(this.package.quantity))
      this.checkOutForm.controls['description'].setValue(this.package.description)
    })

    if (this.token) {
      this.getCandidate()
    }

    this.getCity()
  }

  getCandidate() {
    this.candidateService.getCandidate(this.token.person_id).subscribe(response => {
      this.candidate = response
      //console.log(response)

      this.checkOutForm.controls['candidate_id'].setValue(this.candidate.id)
      this.checkOutForm.controls['name'].setValue(this.candidate.name)
      this.checkOutForm.controls['zipcode'].setValue(this.candidate.zipcode)
      this.checkOutForm.controls['street'].setValue(this.candidate.street)
      this.checkOutForm.controls['email'].setValue(this.candidate.email)
      this.checkOutForm.controls['city'].setValue(this.candidate.city.name)
      this.checkOutForm.controls['document'].setValue(this.candidate.document)
      this.checkOutForm.controls['district'].setValue(this.candidate.district)
      this.checkOutForm.controls['complement'].setValue(this.candidate.complement)
      this.checkOutForm.controls['number'].setValue(this.candidate.number)
      this.checkOutForm.controls['reference'].setValue(this.candidate.reference)
    })
  }

  next() {
    this.candidateService.setCandidate(this.checkOutForm.get('candidate_id').value, this.checkOutForm.value).subscribe(response => {
      if (this.formPaymente == 'CARD') {
        this.cardHash()
      }
      if (this.formPaymente == 'BOLETO') {
        this.boleto()
      }
    }, error => {
      this.alertService.show("danger", "Ops, Falha ao salvar, tente novamente mais tarde.")
    })
  }

  getCity() {
    this.cityService.getCitys().subscribe(response => {
      this.citys = response.data
    })
  }

  formOfPayment(form) {
    this.formPaymente = form
  }

  cardHash() {
    //let checkout = new DirectCheckout("D08F5DE87B9F65E1EB3B1DBA6FD261C3A9169FDEDCE1CEBEE77CCF80C664B0A5", false);
    let checkout = new DirectCheckout("D08F5DE87B9F65E1EB3B1DBA6FD261C3C4CA102D6D9EAA5A181284D975AA6F26", false);


    /* Em sandbox utilizar o construtor new DirectCheckout('PUBLIC_TOKEN', false); */
    if(!this.checkOutForm.get('dateVenc').value){
      this.alertService.show('danger',"Data de vencimento do cartão incorreta!");
      return false
    }

    let cvv = this.checkOutForm.get('dateVenc').value.split('/')
    let cardData = {
      cardNumber: this.checkOutForm.get('numberCard').value,
      holderName: this.checkOutForm.get('fullName').value,
      securityCode: this.checkOutForm.get('cvv').value,
      expirationMonth: cvv[0],
      expirationYear: cvv[1]
    };

    checkout.getCardHash(cardData, function (cardHash) {
      sessionStorage.setItem('hash', cardHash)
    }, function (error) {
      sessionStorage.removeItem('hash')
      sessionStorage.setItem('hash', error)
    });


    setTimeout(() => {
      let hash: any = sessionStorage.getItem('hash');
      //this.today = this.dataPipe.transform(this.today,"dd/mm/yyyy") //  ;
      this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      if (hash.indexOf('Erro') < 0) {
        let data = {
          "description": this.package.description,
          "amount": this.package.price,
          "candidate_id": this.checkOutForm.get('candidate_id').value,
          "type": "CREDIT_CARD",
          "due_date": this.today,
          "credit_card_hash": sessionStorage.getItem('hash')
        }

        this.checkoutService.new(data).subscribe(response => {
          //this.alertService.show('success', "Compra realizada");

          Swal.fire({
            imageUrl: 'assets/img/success.png',
            imageWidth: 178,
            imageHeight: 154,
            title: 'Concluido',
            text: 'Compra de envios realizada!'

          }).then((result) => {
            this.router.navigate(['candidate'])
          })

        }, error => {
          this.alertService.show('danger', error.message);
          console.log("error: " + error)
        })

      } else {
        if (hash == "Error: Invalid expire date") {
          hash = "Data de vencimento do cartão inválido"
        } else if (hash == "Error: Invalid security code") {
          hash = "CVV do cartão inválido"
        } else if (hash == "Error: Invalid card number") {
          hash = "Número do cartão inválido"
        } else if (hash == "Error: Invalid holder name") {
          hash = "Nome do titular inválido"
        }

        this.alertService.show('danger', hash)
      }

    }, 1500);


    // this.candidateRewardService.create(this.checkOutForm.value).subscribe(response => {
    //   this.alertService.show('success', "Compra Realizada")
    // }, error => {
    //   this.alertService.show('danger', error.message)
    // })

  }


  boleto() {
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    let data = {
      "description": this.package.description,
      "amount": this.package.price,
      "candidate_id": this.checkOutForm.get('candidate_id').value,
      "type": "BOLETO",
      "due_date": this.today
      
    }
    
    this.checkoutService.new(data).subscribe(response => {
        //this.alertService.show('success', "Compra realizada");

        Swal.fire({
          imageUrl: 'assets/img/success.png',
          imageWidth: 178,
          imageHeight: 154,
          title: 'Concluido',
          text: 'Receberá seus crédito após a confirmação de pagamento do boleto.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Visualizar Boleto'
        }).then((result) => {
          console.log(result)
          window.open(response.billet_url, '_blank')
          this.router.navigate(['candidate'])
        })

      }, error => {
        this.alertService.show('danger', error.message);
        console.log("error: " + error)
      })

    }


  }
