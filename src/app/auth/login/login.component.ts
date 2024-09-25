import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  username = '';
  password = '';
  isLoadingResults = false;

  constructor(
    private authService:AuthService,
    private router:Router,
    private formBuilder: FormBuilder,
  ){
      this.loginForm = this.formBuilder.group({
        username:[null,Validators.required],
        password:[null, Validators.required]
      })
  }

  async onFormSubmit() {
    console.log(this.loginForm.value.username)
    await this.authService
    .login(this.loginForm.value.username,this.loginForm.value.password)
    .catch((err) => {
      Swal.fire({
        text: 'Invalid credentials',
        icon: 'error',
        allowOutsideClick: true,
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timerProgressBar: true,
        padding: '20px',
        timer: 3000,
      });
    });
  }

}
