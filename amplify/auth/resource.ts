import { defineAuth, secret } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      oidc: [
        { 
          name: 'AWSAmplify-POC2',
          clientId: secret('b0be9f1b-4f41-4edd-8f1d-b31e76f3b8e0'),
          clientSecret: secret('SAo8Q~Sd.6OfL1ZeVxAgBOUt6KawZBdGKftskbba'),
          issuerUrl: 'https://login.microsoftonline.com/5a87a550-9504-4736-a71b-32946e3d4313/v2.0',

          scopes: ['aws.cognito.signin.user.admin', 'email', 'openid', 'phone', 'profile'],          
          attributeMapping: {
            email: 'email'
        }
        

        }
      ],
      logoutUrls: ['http://localhost:4200/', 'https://main.dlm9age1z99sy.amplifyapp.com/'],
      callbackUrls: [
        'http://localhost:4200/profile',
        'https://main.dlm9age1z99sy.amplifyapp.com/profile',
      ],

    },
  },
});