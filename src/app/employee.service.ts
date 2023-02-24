import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  baseUrl: string = 'http://localhost:8080/employeepayrollservice';
  private messageSubject = new Subject<Employee>();
  constructor(private httpClient: HttpClient) {}

  public setData(data: Employee) {
    this.messageSubject.next(data);
  }

  public getData(): Observable<any> {
    return this.messageSubject.asObservable();
  }
 
  public getAllEmployee():Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }

  public getEmployeeData(currentEmployeeId: any):Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${currentEmployeeId}`);
  }
  public addEmployee(employee: Employee): Observable<any> {
   
    return this.httpClient.post<any>(`${this.baseUrl}/create`, employee);
  }
  public deleteEmployee(employeeId:number): Observable<any> {   
    return this.httpClient.delete(`${this.baseUrl}/delete/${employeeId}`);
  }
  public updateEmployee(employeeId:number,employee: Employee): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/update/${employeeId}`, employee);
  }
}
