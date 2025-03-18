import { NgModule } from '@angular/core';
import { AuthModule,LogLevel } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
      config: {
        authority: 'https://cognito-idp.ca-central-1.amazonaws.com/ca-central-1_womHBRJhJ',
        redirectUrl: 'http://localhost:4200',
        postLogoutRedirectUri: 'https://main.dlm9age1z99sy.amplifyapp.com/',
        clientId: '4e4c3j352evpoej1lms1u7ei8h',
        scope: 'email openid phone',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
