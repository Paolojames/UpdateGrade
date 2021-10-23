import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credential, JWTToken } from '@myschool/interfaces/authentication';
import { AuthService } from '@myschool/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logo: string = "/assets/logo.png";
  registerLink: string = "/register";
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      'username': [null, [Validators.required,]],
      'password': [null, [Validators.required,]],
    });
  }

  ngOnInit(): void {
  }

  get usernameForm(): AbstractControl {
    return this.loginForm.controls.username;
  }

  get passwordForm(): AbstractControl {
    return this.loginForm.controls.password;
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credential: Credential = {
      ...this.loginForm.value,
      studentId: this.loginForm.value.username,
      'user_Email': this.loginForm.value.username,
      'user_Username': this.loginForm.value.username,
    };

    this.authService.login(credential, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.usernameForm.setErrors({ '401': true });
        this.passwordForm.setErrors({ '401': true });
      }
    });
  }

}
