import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConfigModule } from './auth/auth-config.module';

import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'ca-central-1_womHBRJhJ',
      userPoolClientId: '4e4c3j352evpoej1lms1u7ei8h'
    }
  }
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    AuthConfigModule,ReactiveFormsModule,MatFormFieldModule, MatDatepickerModule, FormsModule,
    AuthModule.forRoot({
      config: {
        authority: 'https://cognito-idp.ca-central-1.amazonaws.com/ca-central-1_womHBRJhJ',
        redirectUrl: 'https://main.d1ezz5j6n4r91a.amplifyapp.com',
        postLogoutRedirectUri: 'https://main.dlm9age1z99sy.amplifyapp.com/',
        clientId: '4e4c3j352evpoej1lms1u7ei8h',
        scope: 'email openid phone',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
