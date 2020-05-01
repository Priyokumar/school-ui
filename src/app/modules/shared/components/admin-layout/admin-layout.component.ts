import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { allSideNavs, ISideNav, adminSideNavs } from '../../model/shared.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLayoutComponent implements OnInit {

  sideNavs: ISideNav[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {

    const user = this.authService.getAuthDataFromCookies();
    if (user && user.roles && user.roles.length > 0) {
      const superAdminRole = user.roles.find(role => {
        return role.name.toLowerCase().includes('Super Admin'.toLowerCase());
      });

      if (superAdminRole) {
        this.sideNavs = allSideNavs;
      } else {

        const adminRole = user.roles.find(role => {
          return role.name.toLowerCase().includes('Admin'.toLowerCase());
        });
        if (adminRole) {
          this.sideNavs = adminSideNavs;
        }

      }

    }
  }

}
