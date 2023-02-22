import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

let data:any={
  "employee": [
    {
      "name": "mohit kumar new",
      "gender": "male",
      "department": [
        "HR","engineering"
      ],
      "salary": "30000",
      "startDate": "1 Jan 2020",
      "notes": "",
      "id": 1604589551457,
      "profileUrl": "../assets/profile-images/Ellipse 1.png"
    },
    {
      "name": "mohit kumar test",
      "gender": "male",
      "department": [
        "HR"
      ],
      "salary": "30000",
      "startDate": "1 Jan 2020",
      "notes": "",
      "id": 1604589594363,
      "profileUrl": "../assets/profile-images/Ellipse 1.png"
    },
    {
      "name": "mohit",
      "gender": "male",
      "department": [
        "HR"
      ],
      "salary": "30000",
      "startDate": "1 Jan 2020",
      "notes": "",
      "id": 1604589699566,
      "profileUrl": "../assets/profile-images/Ellipse -3.png"
    },
    {
      "name": "test",
      "gender": "male",
      "department": [
        "HR"
      ],
      "salary": "30000",
      "startDate": "1 Jan 2020",
      "notes": "",
      "id": 1604589731061,
      "profileUrl": "../assets/profile-images/Ellipse -3.png"
    }
  ]
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dataSource=data.employee;
  displayedColumns: string[] = [' ','name','gender', 'department', 'salary', 'start date','actions'];

  constructor( private router: Router,private employeeService:EmployeeService){}
  
  ngOnInit(){
    //component interaction using property exchage with history api
    const data=history.state.data;
    console.log('data :>> ', data);
    // if(data){
    //  this.dataSource.push(history.state.data)
    //   history.pushState({data:null},'',this.router.url);
      
    //   console.log(' history.state.data :>> ',  history.state.data);
    // }

    //component interaction using shared service
    this.employeeService.getData().subscribe(employee=>{
      this.dataSource.push(employee)
    })
  }
}
