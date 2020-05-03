import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginData } from '../model/auth.model';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import jwtDecoder from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { ApiEndpoint, IActionResponse } from '../../shared/model/shared.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  public static USER_TOKEN = 'user_token';

  LOGIN_URL = environment.baseUrl + '/login';

  private loginStatusSubject = new BehaviorSubject<boolean>(false);

  login(loginData: ILoginData) {
    return this.http.post<any>(ApiEndpoint.LOGIN, loginData);
  }

  loginOTPVerification(userName: string, otp: number) {
    return this.http.post<IActionResponse>(ApiEndpoint.LOGIN_OTP_VERIFICATION, { otp, userName });
  }

  storeToken(token: any) {
    if (token) {
      const expiry = moment();
      expiry.add(10, 'hours');
      this.cookieService.set(AuthService.USER_TOKEN, token, expiry.toDate());
    }
  }

  extendTokenExpiry() {
    this.storeToken(this.getUserToken());
  }

  getUserToken() {
    const token = this.cookieService.get(AuthService.USER_TOKEN);
    return token;
  }

  removeAllCookies() {
    this.cookieService.deleteAll();
  }

  getAuthDataFromCookies() {
    const token = this.getUserToken();
    const decodedToken = token ? jwtDecoder(token) : null;
    return decodedToken ? JSON.parse(decodedToken.sub).data : null;
  }

  sendLoginSignal() {
    this.loginStatusSubject.next(true);
  }

  recieveLoginSignal() {
    return this.loginStatusSubject.asObservable();
  }

  isSuperAdmin(): boolean {
    let isSuperAdmin = false;
    const user = this.getAuthDataFromCookies();
    if (user && user.roles && user.roles.length > 0) {
      const superAdminRole = user.roles.find(role => {
        return role.name.toLowerCase().includes('Super Admin'.toLowerCase());
      });
      if (superAdminRole) {
        isSuperAdmin = true;
      }
    }
    return isSuperAdmin;
  }

}
