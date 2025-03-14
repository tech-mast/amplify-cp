import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { signInWithRedirect } from 'aws-amplify/auth';


Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TodosComponent, AmplifyAuthenticatorModule],
})
// export class AppComponent  implements OnInit{
  export class AppComponent{
  title = 'amplify-angular-template';
  
  // ngOnInit(): void {
  //   signInWithRedirect({

  //     provider: {
  //       custom: 'AWSAmplify-POC2'
  //     }
  //   });
  // }
  test() {
   console.log ('I am in test');
       signInWithRedirect({

      provider: {
        custom: 'AWSAmplify-POC2'
      }
    });
   console.log ('I left test');

  }

  // constructor(public authenticator: AuthenticatorService) {
    constructor() {    
    Amplify.configure(outputs);

  }

}
