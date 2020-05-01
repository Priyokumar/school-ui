import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() hasLogined = false;
  @Input() userData: any;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.recieveLoginSignal().subscribe(data => {
      if (data === true) {
        this.hasLogined = true;
        this.getUserData();
      }
    });
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.userData = this.authService.getAuthDataFromCookies();
    if (this.userData) {
      this.hasLogined = true;
      this.authService.extendTokenExpiry();
    } else {
      this.hasLogined = false;
      this.router.navigate(['']);
    }
  }

  logout() {
    this.authService.removeAllCookies();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

}
