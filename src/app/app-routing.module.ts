import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [  
  { path: '', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule) },
  { path: 'search', loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule) },
  { path: 'signin', loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
  { path: 'offer-detail/:id', loadChildren: () => import('./pages/offer-detail/offer-detail.module').then(m => m.OfferDetailModule) },
  { path: 'candidate', loadChildren: () => import('./pages/candidate/candidate.module').then(m => m.CandidateModule) },
  { path: 'forgot-password', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'change-password/:recovery_code', loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordModule) },
  { path: 'validate-account', loadChildren: () => import('./pages/validate-account/validate-account.module').then(m => m.ValidateAccountModule) },
  { path: 'pay', loadChildren: () => import('./pages/pay/pay.module').then(m => m.PayModule) },
  { path: 'contato', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
  { path: 'verified-email/:id', loadChildren: () => import('./pages/verified-email/verified-email.module').then(m => m.VerifiedEmailModule) },
  { path: 'submit-verified-email', loadChildren: () => import('./pages/submit-verified-email/submit-verified-email.module').then(m => m.SubmitVerifiedEmailModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
