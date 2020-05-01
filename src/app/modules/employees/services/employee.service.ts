import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../shared/model/shared.model';
import { IEmployee } from '../model/employeeModels';

@Injectable()
export class EmployeeService {

  private saveSubject = new BehaviorSubject<any>('');
  private discardSubject = new BehaviorSubject<any>('');

  constructor(
    private http: HttpClient
  ) { }

  sendSaveInstruction(data: any) {
    this.saveSubject.next(data);
  }

  receiveSaveInstruction() {
    return this.saveSubject.asObservable();
  }

  sendDiscardInstruction(data: any) {
    this.discardSubject.next(data);
  }

  receiveDiscardInstruction() {
    return this.discardSubject.asObservable();
  }

  getEmployee(email: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(ApiEndpoint.EMPLOYEES + '/email/' + email);
  }


}
