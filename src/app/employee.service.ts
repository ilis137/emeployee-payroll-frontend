import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private messageSubject = new Subject<Employee>();
  constructor() { }

  public setData(data: Employee) {
   this.messageSubject.next(data);
  }

  public getData(): Observable<Employee> {
   return this.messageSubject.asObservable();
 }

}
