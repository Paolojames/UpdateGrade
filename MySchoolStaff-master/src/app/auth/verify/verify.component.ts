import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit, OnDestroy {
  verificationToken?: string;
  register: string = "/register";

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.snackBar.open('Please check your registered email address/mobile number for the verification code.', 'Got it!', {
      // verticalPosition: 'top',
      panelClass: 'verification-snack-bar'
    });

    this.route.params.subscribe(param => {
      this.verificationToken = param.token;
    });
  }

  onVerify(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
  }

}
