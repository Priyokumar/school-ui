import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ILoginData } from '../../model/auth.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  emailFormCtl = new FormControl('', null);
  passwordFormCtl = new FormControl('', null);
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const userData = this.authService.getAuthDataFromCookies();
    if (userData) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  login() {

    const loginData: ILoginData = {
      email: this.emailFormCtl.value,
      password: this.passwordFormCtl.value
    };

    if (!loginData.email || !loginData.password) {
      return;
    }

    this.authService.login(loginData).subscribe(data => {
      this.router.navigate(['/otp'], { queryParams: { email: this.emailFormCtl.value } });
    }, error => {
      console.log(error);
      this.errorMessage = 'Invalid credential !';
      this.snackBar.open('Invalid credential.', 'Got it!', { duration: 5000 });
    });

  }

}
