import { Injectable } from '@angular/core';
import jwtDecoder from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  yearsLtCurrentYear(count: number): string[] {
    let currentYear = new Date().getFullYear();

    const years: string[] = [];

    for (let i = 0; i < count; i++) {
      if (i !== 0) {
        currentYear -= 1;
      }
      years.push(currentYear + '');
    }

    return years;
  }

  constructor() { }

}
