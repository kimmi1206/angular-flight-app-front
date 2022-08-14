import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthentificationInterceptor } from './authentification.interceptor';
import { MatFormFieldModule, MatButtonModule, MatInputModule, MatCardModule, MatIconModule, MatToolbarModule, MatCheckboxModule, MatSelectModule } from '@angular/material';
import { AuthentificationComponent } from './authentification.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PortalModule } from '../portal/portal.module';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BrowserModule } from '@angular/platform-browser';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';


@NgModule({
  declarations: [AuthentificationComponent,LoginComponent,RegistrationComponent, ForgotPasswordComponent,ResetPasswordComponent, ConfirmRegistrationComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthentificationInterceptor,
      multi: true
    }
  ],
  imports: [   
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    PortalModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSelectModule
    ]
})  
export class AuthentificationModule { }
