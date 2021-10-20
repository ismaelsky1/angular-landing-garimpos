import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { PayComponent } from './../pay/pay.component';
import { CandidateSkillService } from './../../services/candidate-skill.service';
import { CandidateExperienceService } from './../../services/candidate-experience.service';
import { AlertService } from './../../services/alert.service';
import { CandidateObjectiveService } from './../../services/candidate-objective.service';
import { CboService } from './../../services/cbo.service';
import { JobService } from './../../services/job.service';
import { CityService } from './../../services/city.service';
import { RewardService } from './../../services/reward.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateRewardService } from './../../services/candidate-reward.service';
import { SubscriptionService } from './../../services/subscription.service';
import { CadidateService } from './../../services/cadidate.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
declare var $: any;
import { NgxImageCompressService } from 'ngx-image-compress';
// import flatpickr from "flatpickr";
// import { Portuguese } from "flatpickr/dist/l10n/pt.js"

@Component({
  selector: 'garp-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  sessionToken: any;
  candidate: any;
  notifications: any = [];
  subscription: any = [];
  rewards: any = [];
  citys: any = [];
  job: any = [];
  cbo: any = [];
  cboAvailable: any = []
  isCurrentjob: any = false;

  candidateObjective: any = [];
  candidateExperience: any = [];
  candidateReward: any = [];
  candidateSkill: any = [];
  reward_balance: any = [];

  selectedObjective: any = null;

  personalDateForm: FormGroup;
  additionalInformationForm: FormGroup;
  introductoryMessageForm: FormGroup;
  candidateExperienceForm: FormGroup;
  candidateSkillForm: FormGroup;

  isChangePersonalDateForm: boolean = false;
  isChangeAdditionalInformationForm: boolean = false;
  isChangeIntroductoryMessageForm: boolean = false;
  isChangeCandidateExperienceForm: boolean = false;
  isChangeCandidateSkillForm: boolean = false;

  isLoading: boolean = false;
  avatarUser: string = "assets/img/clients/160x160/img-1.png"

  url: string = environment.url

  currentPageReward: number = 1;
  lastPageReward: number = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private cadidateService: CadidateService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private candidateRewardService: CandidateRewardService,
    private formBuilder: FormBuilder,
    private rewardService: RewardService,
    private cityService: CityService,
    private jobService: JobService,
    private cboService: CboService,
    private candidateObjectiveService: CandidateObjectiveService,
    private alertService: AlertService,
    private candidateExperienceService: CandidateExperienceService,
    private candidateSkillService: CandidateSkillService,
    private router: Router,
    private imageCompress: NgxImageCompressService

  ) { }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.date').mask('00-00-0000');
      //$('.time').mask('00:00:00');
      $('.date_time').mask('00/00/0000 00:00:00');
      $('.cep').mask('00000-000');
      //$('.phone').mask('0000-0000');
      $('.phone_with_ddd').mask('(00) 0 0000-0000');
      //$('.phone_us').mask('(000) 000-0000');
      //$('.mixed').mask('AAA 000-S0S');
      $('.cpf').mask('000.000.000-00', { reverse: false });
      $('.money').mask('000.000.000.000.000,00', { reverse: true });
      //$('.quilograma').mask(' 000.00', { reverse: true });
      $('.altura').mask(' 0.00', { reverse: false });
    });

    this.personalDateForm = this.formBuilder.group({
      avatar: null,
      birthday: null,//
      cellphone: null,
      //city: null,
      city_id: null,
      cnh: null,//
      cnh_category: null,//
      complement: null,
      //consultant_id: null,
      ctps: null,//
      ctps_state: null,//    
      district: null,
      document: null,//
      email: null,
      height: null,//
      homepage: null,
      gender: null,//
      marital_status: null,//
      name: null,//
      nationality: null,//
      naturalness: null,
      nickname: null,//
      number: null,
      pis: null,//
      reference: null,
      rg: null,//
      rg_emitting_organ: null,//
      rg_issuance_date: null,//
      rg_state: null,//
      street: null,
      voter_title: null,//
      weight: null,//
      zipcode: null
    })

    this.introductoryMessageForm = this.formBuilder.group({
      introductory_message: null,

    })

    this.additionalInformationForm = this.formBuilder.group({
      additional_information: null,
    })

    this.candidateExperienceForm = this.formBuilder.group({
      id: null,
      candidate_id: null,
      company: null,
      occupation: null,
      activities: null,
      initial_date: null,
      final_date: null
    })

    this.candidateSkillForm = this.formBuilder.group({
      id: null,
      candidate_id: null,
      company: null,
      type: null,
      work_load: null,
      skill: null
    })

    this.sessionToken = jwt_decode(this.authenticationService.getTokenValue())
    this.getCandidate(this.sessionToken.person_id)
    //this.getUser(this.sessionToken.id)
    this.getSubscriptions(this.sessionToken.person_id)
    //this.getCandidateReward(this.sessionToken.person_id)
    this.getRewards();
    this.getCity();
    this.getExperience();

  }
  // getUser(id){
  //   this.userService.getUser(id).subscribe(response=>{
  //     console.log(response)
  //   })
  // }

  getCandidate(person_id) {
    this.cadidateService.getCandidate(person_id).subscribe(response => {
      this.candidate = response
      this.candidateExperience = response.candidate_experience
      this.candidateObjective = response.candidate_objective
      this.candidateReward = response.candidate_reward
      this.candidateSkill = response.candidate_skill
      this.reward_balance = response.reward_balance
      this.notifications = response.user.notifications_to
      console.log(this.candidate)

      this.avatarUser = this.url + this.candidate.avatar
      this.personalDateForm.controls['avatar'].setValue(this.candidate.avatar)
      this.personalDateForm.controls['name'].setValue(this.candidate.name)
      this.personalDateForm.controls['nickname'].setValue(this.candidate.nickname)
      this.personalDateForm.controls['height'].setValue(this.candidate.height)
      this.personalDateForm.controls['weight'].setValue(this.candidate.weight)
      this.personalDateForm.controls['birthday'].setValue(this.outDataFormat(this.candidate.birthday))
      this.personalDateForm.controls['gender'].setValue(this.candidate.gender)
      this.personalDateForm.controls['document'].setValue(this.candidate.document)
      this.personalDateForm.controls['rg'].setValue(this.candidate.rg)
      this.personalDateForm.controls['rg_emitting_organ'].setValue(this.candidate.rg_emitting_organ)
      this.personalDateForm.controls['rg_issuance_date'].setValue(this.outDataFormat(this.candidate.rg_issuance_date))
      this.personalDateForm.controls['rg_state'].setValue(this.candidate.rg_state)


      this.personalDateForm.controls['voter_title'].setValue(this.candidate.voter_title)
      this.personalDateForm.controls['naturalness'].setValue(this.candidate.naturalness)
      this.personalDateForm.controls['nationality'].setValue(this.candidate.nationality)
      this.personalDateForm.controls['cnh'].setValue(this.candidate.cnh)
      this.personalDateForm.controls['cnh_category'].setValue(this.candidate.cnh_category)
      this.personalDateForm.controls['ctps'].setValue(this.candidate.ctps)
      this.personalDateForm.controls['ctps_state'].setValue(this.candidate.ctps_state)
      this.personalDateForm.controls['pis'].setValue(this.candidate.pis)
      this.personalDateForm.controls['marital_status'].setValue(this.candidate.marital_status)



      this.personalDateForm.controls['email'].setValue(this.candidate.email)
      this.personalDateForm.controls['cellphone'].setValue(this.candidate.cellphone)
      this.personalDateForm.controls['homepage'].setValue(this.candidate.homepage)
      this.personalDateForm.controls['zipcode'].setValue(this.candidate.zipcode)
      this.personalDateForm.controls['city_id'].setValue(this.candidate.city_id)
      this.personalDateForm.controls['district'].setValue(this.candidate.district)
      this.personalDateForm.controls['street'].setValue(this.candidate.street)
      this.personalDateForm.controls['complement'].setValue(this.candidate.complement)
      this.personalDateForm.controls['number'].setValue(this.candidate.number)
      this.personalDateForm.controls['reference'].setValue(this.candidate.reference)


      this.introductoryMessageForm.controls['introductory_message'].setValue(this.candidate.introductory_message),
        this.additionalInformationForm.controls['additional_information'].setValue(this.candidate.additional_information)


      this.getCbo();

      //console.log(this.candidate)
    })
  }

  setCandidate(dataCandidate) {
    this.isLoading = true;

    if (dataCandidate.birthday) {
      dataCandidate.birthday = this.inDataFormat(dataCandidate.birthday)
    }
    if (dataCandidate.rg_issuance_date) {
      dataCandidate.rg_issuance_date = this.inDataFormat(dataCandidate.rg_issuance_date)
    }

    this.cadidateService.setCandidate(this.sessionToken.person_id, dataCandidate).subscribe(response => {
      this.isLoading = false;
      this.isChangePersonalDateForm = false;
      this.isChangeAdditionalInformationForm = false;
      this.isChangeIntroductoryMessageForm = false;
      this.getCandidate(this.sessionToken.person_id)
      this.alertService.show("success", "Dados Atualizados")
    }, error => {
      this.isLoading = false;
      this.isChangePersonalDateForm = true;
      this.isChangeAdditionalInformationForm = true;
      this.isChangeIntroductoryMessageForm = true;
      this.alertService.show("danger", error.message)
    })
  }

  getSubscriptions(person_id) {
    this.subscriptionService.getSubscriptions(person_id).subscribe(response => {
      this.subscription = response
      //console.log(response)
    })
  }

  // getCandidateReward(person_id) {
  //   this.candidateRewardService.getcandidateRewards().subscribe(response => {
  //     //console.log(response)
  //   })
  // }

  getRewards(page = this.currentPageReward) {
    this.rewardService.getRewards(page).subscribe(response => {
      this.rewards = response.data

      this.currentPageReward = response.current_page
      this.lastPageReward = response.last_page
    })
  }

  setSubscription(subscriptionsId, status = { status: "GIVE_UP" }) {
    this.subscriptionService.setSubscription(subscriptionsId, status).subscribe(response => {
      this.getSubscriptions(this.sessionToken.person_id)
    })
  }

  getCity() {
    this.cityService.getCitys().subscribe(response => {
      this.citys = response.data
    })
  }

  getCbo() {
    this.cboService.index().subscribe(response => {
      this.cbo = response.data

      let candidateObjectiveId = [];
      let isCandidateCbo = []

      this.candidateObjective.forEach(element => {
        candidateObjectiveId.push(element.cbo_id)
      });

      this.cbo.forEach(element => {
        if (candidateObjectiveId.indexOf(element.id) < 0) {
          isCandidateCbo.push(element)
        }
      });
      this.cboAvailable = isCandidateCbo
    })
  }

  setCandidateObjective() {    
    this.candidateObjectiveService.create({ candidate_id: this.sessionToken.person_id, cbo_id: this.selectedObjective }).subscribe(response => {
      this.getCandidate(this.sessionToken.person_id)
      this.alertService.show("success", "Objetivo definido com sucesso")
      $('.candidateObjective').modal('hide')
    }, error => {
      this.alertService.show("danger", error.message[0])
      $('.candidateObjective').modal('hide')
    })
  }

  deleteCandidateObjective(candidateObjectiveId) {
    this.candidateObjectiveService.destroy(candidateObjectiveId).subscribe(response => {
      this.getCandidate(this.sessionToken.person_id)
      this.alertService.show("success", "Objetivo removido com sucesso")
      //$('.candidateObjective').modal('hide')
    }, error => {
      this.alertService.show("danger", error.message[0])
      //$('.candidateObjective').modal('hide')
    })
  }

  getExperience() {
    this.candidateExperienceService.index().subscribe(response => {
      this.candidateExperience = response.data
      // console.log(this.candidateExperience)
    }, error => {
      this.alertService.show("danger", error.message[0])

    })

  }

  createExperience(data) {
    this.isLoading = true;
    data.candidate_id = this.sessionToken.person_id
    data.initial_date = this.inDataFormat(data.initial_date)
    if (data.final_date !== null) {
      data.final_date = this.inDataFormat(data.final_date)
    }

    if (this.isCurrentjob) {
      data.final_date = null
    }

    this.candidateExperienceService.create(data).subscribe(response => {
      this.getCandidate(this.sessionToken.person_id)
      $('.candidateExperience').modal('hide')
      this.alertService.show("success", "Experiencia cadastrada")
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.alertService.show("danger", error.message[0])
      $('.candidateExperience').modal('hide')
    })
  }

  updateExperience(data) {
    this.isLoading = true;
    data.candidate_id = this.sessionToken.person_id
    data.initial_date = this.inDataFormat(data.initial_date)
    if (data.final_date !== null) {
      data.final_date = this.inDataFormat(data.final_date)
    }

    if (this.isCurrentjob) {
      data.final_date = null
    }

    this.candidateExperienceService.update(data).subscribe(response => {
      this.getCandidate(this.sessionToken.person_id)
      $('.candidateExperience').modal('hide')
      this.alertService.show("success", "Experiencia Atualizada")
      this.resetFill()
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.alertService.show("danger", error.message[0])
      $('.candidateExperience').modal('hide')
    })

  }

  deleteExperience(data) {
    this.candidateExperienceService.destroy(data.id).subscribe(response => {
      this.getCandidate(this.sessionToken.person_id)
      $('.candidateExperience').modal('hide')
      this.alertService.show("success", "Experiencia Removida")
      this.resetFill()
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.alertService.show("danger", error.message[0])
      $('.candidateExperience').modal('hide')
    })
  }

  fillExperience(experience) {
    this.candidateExperienceForm.reset()
    this.candidateExperienceForm.controls['id'].setValue(experience.id)
    this.candidateExperienceForm.controls['candidate_id'].setValue(experience.candidate_id)
    this.candidateExperienceForm.controls['company'].setValue(experience.company)
    this.candidateExperienceForm.controls['occupation'].setValue(experience.occupation)
    this.candidateExperienceForm.controls['activities'].setValue(experience.activities)
    this.candidateExperienceForm.controls['initial_date'].setValue(experience.initial_date)
    this.candidateExperienceForm.controls['final_date'].setValue(experience.final_date)

    //candidateExperienceForm
    $('.candidateExperience').modal('show')
  }

  createSkill(data) {
    this.isLoading = true;
    data.candidate_id = this.sessionToken.person_id

    this.candidateSkillService.create(data).subscribe(response => {
      this.getCandidate(this.sessionToken.person_id)
      $('.candidateSkill').modal('hide')
      this.alertService.show("success", "Habilidade cadastrada")
      this.isLoading = false;
      this.resetFill()
    }, error => {
      this.isLoading = false;
      this.alertService.show("danger", error.message[0])
      $('.candidateSkill').modal('hide')
    })

  }

  updateSkill(data) {
    this.isLoading = true;

    this.candidateSkillService.update(data).subscribe(response => {
      this.getCandidate(this.sessionToken.person_id)
      $('.candidateSkill').modal('hide')
      this.alertService.show("success", "Habilidade cadastrada")
      this.isLoading = false;
      this.resetFill()
    }, error => {
      this.isLoading = false;
      this.alertService.show("danger", error.message[0])
      $('.candidateSkill').modal('hide')
    })

  }


  // changeAvatarCandidate(target) {
  //   if (target.files.length > 0) {

  //     var file: File = target.files[0];
  //     var myReader: FileReader = new FileReader();

  //     myReader.onloadend = (e) => {
  //       this.personalDateForm.controls['avatar'].setValue(myReader.result)
  //       console.log(myReader.result)
  //       //console.log()

  //       // this.cadidateService.setCandidate(this.candidate.id,{avatar: myReader.result}).subscribe(response=>{
  //       //   this.avatarUser = this.url+response.avatar
  //       //   this.alertService.show("success","Foto Atualizada")
  //       // },error=>{
  //       //   console.log(error)
  //       //   this.alertService.show("danger",error.message)
  //       // })

  //     }
  //     myReader.readAsDataURL(file);

  //   }

  // }

  compressFile() {
    let imgResultBeforeCompress: any;
    this.imageCompress.uploadFile().then(({ image, orientation }) => {

      imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.cadidateService.setCandidate(this.candidate.id,{avatar: result}).subscribe(response=>{
            this.avatarUser = this.url+response.avatar
            this.alertService.show("success","Foto Atualizada")
          },error=>{           
            this.alertService.show("danger",error.message)
          })
      
        }
      );

    });

  }

  deleteSkill(data) {
    this.candidateSkillService.destroy(data.id).subscribe(response => {
      this.getCandidate(this.sessionToken.person_id)
      $('.candidateSkill').modal('hide')
      this.alertService.show("success", "Formação Removida")
      this.resetFill()
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.alertService.show("danger", error.message[0])
      $('.candidateSkill').modal('hide')
    })
  }

  fillSkill(skill) {
    this.resetFill()  
    this.candidateSkillForm.controls['id'].setValue(skill.id)
    this.candidateSkillForm.controls['candidate_id'].setValue(skill.candidate_id)
    this.candidateSkillForm.controls['company'].setValue(skill.company)
    this.candidateSkillForm.controls['type'].setValue(skill.type)
    this.candidateSkillForm.controls['work_load'].setValue(skill.work_load)
    this.candidateSkillForm.controls['skill'].setValue(skill.skill)

    $('.candidateSkill').modal('show')
  }

  currentJob(event) {
    this.isCurrentjob = event
  }

  outDataFormat(date) {
    if (date) {
      let split = date.split('-');
      split[2].split(" ")
      let newData = split[2][0] + split[2][1] + "-" + split[1] + "-" + split[0];
      return newData
    }

  }

  inDataFormat(date) {
    if (date) {
      let split = date.split('-');
      let newData = split[2] + "-" + split[1] + "-" + split[0];
      return newData
    }
  }

  resetFill() {
    this.candidateSkillForm.reset()
    this.candidateExperienceForm.reset()
  }

  pay(reward) {
    this.router.navigate(['/pay'], { queryParams: reward })
    $('.MyCredit').modal('hide')
  }


}
