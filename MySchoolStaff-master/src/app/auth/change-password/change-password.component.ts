import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '@myschool/services/profile.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;
  changePasswordForm: FormGroup;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private profileService: ProfileService,
  ) {
    this.changePasswordForm = this.fb.group({
      'oldPassword': [null, [Validators.required,]],
      'newPassword': [null, [Validators.required, Validators.minLength]],
      'confirmPassword': [null, [Validators.required, Validators.minLength]],
    });
  }

  ngOnInit(): void {
  }

  private validatePassword(): void {
    if (this.newPasswordForm.value != this.confirmPasswordForm.value) {
      this.confirmPasswordForm.setErrors({ 'notMatch': true })
    }
  }

  private invalidOldPassword(): void {
    this.oldPasswordForm.setErrors({ 'invalid': true });
  }

  onChangePassword(): void {
    this.validatePassword();
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.profileService.changePassword({
      old_password: this.oldPasswordForm.value,
      password: this.newPasswordForm.value
    }, (error: HttpErrorResponse) => {
      if (error.status === 400) {
        this.invalidOldPassword();
      }
    })
      .subscribe(() => this.location.back());
  }

  onCancel(): void {
    this.location.back();
  }

  get oldPasswordForm(): AbstractControl {
    return this.changePasswordForm.controls.oldPassword;
  }

  get newPasswordForm(): AbstractControl {
    return this.changePasswordForm.controls.newPassword;
  }

  get confirmPasswordForm(): AbstractControl {
    return this.changePasswordForm.controls.confirmPassword;
  }
}
