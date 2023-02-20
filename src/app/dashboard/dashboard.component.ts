import { Component } from '@angular/core';

let data:any={
  "employee": [
    {
      "name": "mohit kumar new",
      "gender": "male",
      "departMent": [
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
      "departMent": [
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
      "departMent": [
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
      "departMent": [
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
}
