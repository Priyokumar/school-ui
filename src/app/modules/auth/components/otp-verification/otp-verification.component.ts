import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit, OnDestroy {

  otpFormCtl = new FormControl('', null);
  email: string;
  errorMessage: string;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {

    this.subscription = this.activatedRoute.queryParams.subscribe(data => {
      this.email = data.email;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const userData = this.authService.getAuthDataFromCookies();
    if (userData) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  otpVerification() {

    this.authService.loginOTPVerification(this.email, this.otpFormCtl.value).subscribe(data => {
      // this.authService.storeToken(data.apiMessage.detail);
      this.router.navigate(['/admin/dashboard']);
      this.authService.sendLoginSignal();
    }, error => {
      console.log(error);
      this.errorMessage = 'Invalid otp!';
    });

  }

  resend() {

  }

}
