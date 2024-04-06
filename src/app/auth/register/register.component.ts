import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth.service';
import { REGISTER_MUTATION, registerUserRespone } from './register.graphql';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup | any;
  username = '';
  password = '';
  name = '';
  isLoadingResults = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private apollo: Apollo) {
    this.registerForm = this.formBuilder.group({
      userFirstName : [null, Validators.required],
      userLastName : [null, Validators.required],
      userUsername : [null, Validators.required],
      userPhone: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword:[null, Validators.required],
      userEmail:[null, Validators.required],
    });
  }

  onFormSubmit() {
    console.log(this.registerForm.value)
    return this.apollo
      .mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          input:this.registerForm.value,
        },
      })
      .subscribe((data ) => {
        if(data){
          this.router.navigate(['']);
        }
      });
  }


}
