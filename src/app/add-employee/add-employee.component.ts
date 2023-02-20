import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  salaries=[10000,20000,30000,40000,50000]
  employeeForm:FormGroup = this.formBuilder.group({
    employeeName : new FormControl('',Validators.required),
    image : new FormControl('',Validators.required),
    gender : new FormControl('',Validators.required),
    department : new FormArray([],Validators.required),
    salary : new FormControl('',Validators.required),
    date : new FormControl('',Validators.required),
    note : new FormControl('',Validators.required),
  })

  constructor( private formBuilder : FormBuilder){}

  
  formatLabel(value: number) {
   
    return value.toString();
  }
}
