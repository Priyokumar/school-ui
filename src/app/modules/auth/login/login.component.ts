import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ILoginData } from '../model/auth.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  email = new FormControl('', null);
  password = new FormControl('', null);
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

  async login() {

    const loginData: ILoginData = {
      email: this.email.value,
      password: this.password.value
    };

    if (!loginData.email || !loginData.password) {
      return;
    }

    try {
      const resp = await this.authService.login(loginData).toPromise();
      this.authService.storeToken(resp.token);
      this.router.navigate(['/admin/dashboard']);
      this.authService.sendLoginSignal();
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Invalid credential !';
      this.snackBar.open('Invalid credential.', 'Got it!', { duration: 5000 });
    }
  }

}
