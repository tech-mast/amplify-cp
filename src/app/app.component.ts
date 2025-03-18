import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthModule } from 'angular-auth-oidc-client';
import { NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';

import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import * as AWS from 'aws-sdk';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // imports: [RouterOutlet, NgFor, ReactiveFormsModule],
  standalone: false,
  styleUrl: './app.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class AppComponent implements OnInit{
  title = 'sas-pricing';
  private readonly oidcSecurityService = inject(OidcSecurityService);

  userData$ = this.oidcSecurityService.userData$;
  email = '';
  isAuthenticated = false;

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData}) => {
    
      console.log('userData: ', userData);
      console.log('isAuthenticated: ', isAuthenticated);        
      this.isAuthenticated = isAuthenticated; 
      this.email = userData.email;
      console.log('userData_email:: ', userData.email);  

    });
    setTimeout(() => {
      let element: HTMLElement = document.getElementById('login') as HTMLElement;
      element.click();
    }, 1000);
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  userForm!: FormGroup;
  // constructor(public auth: AuthModule) {}



constructor (public auth: AuthModule, private formBuilder: FormBuilder) {
  this.userForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: [
      5000,
      [
        Validators.required,
        // Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
      ],
    ],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
    }),
    phoneNumbers: this.formBuilder.array([
      this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
    ]),
    cityName: ['', [Validators.required]]
  });
}


  loginWithRedirect() {
    this.auth;

  }

  logout(): void {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
    // Clear session storage
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }

    window.location.href = "https://ca-central-1womhbrjhj.auth.ca-central-1.amazoncognito.com/login?client_id=4e4c3j352evpoej1lms1u7ei8h&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A4200";

  }

// user page

// userForm!: FormGroup;

// constructor(private formBuilder: FormBuilder) {
//   this.userForm = this.formBuilder.group({
//     name: ['', Validators.required],
//     email: [
//       '',
//       [
//         Validators.required,
//         Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
//       ],
//     ],
//     address: this.formBuilder.group({
//       street: ['', Validators.required],
//       city: ['', Validators.required],
//     }),
//     phoneNumbers: this.formBuilder.array([
//       this.formBuilder.control('', [
//         Validators.required,
//         Validators.pattern(/^\d{10}$/),
//       ]),
//     ]),
//   });
// }

get phoneNumbers(): FormArray {
  return this.userForm.get('phoneNumbers') as FormArray;
}

addPhoneNumber() {
  this.phoneNumbers.push(
    this.formBuilder.control('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ])
  );
}

removePhoneNumber(index: number) {
  this.phoneNumbers.removeAt(index);
}

// product dropdown list

isSubmitted = false;

// City Names
City: any = ['Expedited', 'Regular', 'Xpresspost', 'Priority', 'DDI', 'Expedited Returns', 'Regular Returns', 'Xpresspost Returns', 'Priority Returns', 'Expedited Interliner', 'Regular Interliner', 'Xpresspost Interliner']

// constructor(public fb: FormBuilder) { }

/*########### Form ###########*/
// registrationForm = this.fb.group({
//   cityName: ['', [Validators.required]]
// })


// Choose city using select dropdown
changeCity(e) {
  console.log(e.value)

  this.cityName.setValue(e.target.value, {
    onlySelf: true
  })

}

// Getter method to access formcontrols
get cityName() {
  return this.userForm.get('cityName');
}


// submitForm() {
//   if (this.userForm.valid) {
//     console.log(this.userForm.value);
//   }
// }

// datepicker

readonly range = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
});

submitForm() {
  this.isSubmitted = true;
  if (!this.userForm.valid) {
    return false;
  } else {
    alert(JSON.stringify(this.userForm.value))
  }

}

// upload file 

selectedFile: File | null = null;

// Initialize AWS S3
s3 = new AWS.S3({
  accessKeyId: 'YOUR_ACCESS_KEY', // Do not use this in production (use IAM roles or Cognito)
  secretAccessKey: 'YOUR_ACCESS_KEY', // Do not use this in production (use IAM roles or Cognito)
  region: 'YOUR_ACCESS_KEY' // Update with your S3 bucket region
});


// Handle file selection
onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

// Upload file to S3
onUpload() {
  if (this.selectedFile) {
    const file = this.selectedFile;
    const params = {
      Bucket: 'YOUR_ACCESS_KEY',  // Your S3 bucket name
      Key: file.name,              // The file name to be saved in S3
      Body: file,                  // The file to upload
      ContentType: file.type,      // MIME type of the file
      ACL: 'public-read'           // Permissions (adjust as needed)
    };

    this.s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading file:', err);
      } else {
        console.log('File uploaded successfully:', data);
      }
    });
  }
}





}
