import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { AuthentificationGuard } from './authentification/guards/authentification.guard';
import { FlightsGuard } from './authentification/guards/flights.guard';
import { AuthentificationComponent } from './authentification/authentification.component';
import { RegistrationComponent } from './authentification/registration/registration.component';
import { ForgotPasswordComponent } from './authentification/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './exceptions/page-not-found/page-not-found.component';
import { ExceptionComponent } from './exceptions/exception/exception.component';
import { ResetPasswordComponent } from './authentification/reset-password/reset-password.component';
import { ConfirmRegistrationComponent } from './authentification/confirm-registration/confirm-registration.component';

const routes: Routes = [
  { path: '', redirectTo: 'flights/search', pathMatch: 'full' },
  {
    path: 'authentification', component: AuthentificationComponent, canActivate: [AuthentificationGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
     { path: 'reset-password', component: ResetPasswordComponent },
     { path: 'registration-confirm', component: ConfirmRegistrationComponent }
    ]
  },
  {
    path: 'flights',
    loadChildren: './flights/flights.module#FlightsModule',
    canActivate: [FlightsGuard],
    canLoad: [FlightsGuard]
  },
  { path: 'exception', component: ExceptionComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
