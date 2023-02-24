import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';

let data:any={
  "employee": [
    {
      "name": "mohit kumar new",
      "gender": "male",
      "departments": [
        "HR","engineering"
      ],
      "salary": "30000",
      "startDate": "1 Jan 2020",
      "notes": "",
      "id": 1604589551457,
      "profilePic": "../assets/profile-images/Ellipse 1.png"
    },
    {
      "name": "mohit kumar test",
      "gender": "male",
      "departments": [
        "HR"
      ],
      "salary": "30000",
      "startDate": "1 Jan 2020",
      "notes": "",
      "id": 1604589594363,
      "profilePic": "../assets/profile-images/Ellipse 1.png"
    },
    {
      "name": "mohit",
      "gender": "male",
      "departments": [
        "HR"
      ],
      "salary": "30000",
      "startDate": "1 Jan 2020",
      "notes": "",
      "id": 1604589699566,
      "profilePic": "../assets/profile-images/Ellipse -3.png"
    },
    {
      "name": "test",
      "gender": "male",
      "departments": [
        "HR"
      ],
      "salary": "30000",
      "startDate": "1 Jan 2020",
      "notes": "",
      "id": 1604589731061,
      "profilePic": "../assets/profile-images/Ellipse -3.png"
    }
  ]
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dataSource=[];
  displayedColumns: string[] = [' ','name','gender', 'department', 'salary', 'start date','actions'];

  constructor( private router: Router,private employeeService:EmployeeService,private ngxService: NgxUiLoaderService,private _snackBar: MatSnackBar){}
  
  ngOnInit(){
    //component interaction using property exchage with history api
    // const data=history.state.data;
    // console.log('data :>> ', data);
    // if(data){
    //  this.dataSource.push(history.state.data)
    //   history.pushState({data:null},'',this.router.url);
      
    //   console.log(' history.state.data :>> ',  history.state.data);
    // }

    //component interaction using shared service
    // this.employeeService.getData().subscribe((employee:Employee)=>{
    //   this.dataSource.push(employee)
    // })
    this.ngxService.start(); 
    this.employeeService.getAllEmployee().subscribe((result)=>{
        this.dataSource=result.data;
        this.ngxService.stop(); 
    })
  }

  deleteEmployee(employeeId:number){
    this.employeeService.deleteEmployee(employeeId).subscribe((result)=>{
       if(result.data){
        this.dataSource=this.dataSource.filter((employee:Employee)=>employee.id!==employeeId)
        this._snackBar.open(`Employee data successfully deleted`, 'ok', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
       }
    });
  }

  
}
