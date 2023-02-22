import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  salaries = [10000, 20000, 30000, 40000, 50000];
  departments = ['HR', 'Sales', 'Finance', 'Engineer', 'Other'];
  profiles = [
    '../assets/profile-images/Ellipse -1.png',
    '../assets/profile-images/Ellipse -2.png',
    '../assets/profile-images/Ellipse -3.png',
    '../assets/profile-images/Ellipse -4.png',
  ];
  employeeForm: FormGroup = this.formBuilder.group({
    employeeName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3),
    ]),
    image: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    department: new FormArray([], Validators.required),
    salary: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private _snackBar: MatSnackBar
  ) {}

  onDepartmentChange(event: any) {
    const departmentArray: FormArray = this.employeeForm.get(
      'department'
    ) as FormArray;
    if (event.checked) {
      departmentArray.push(new FormControl(event.source.value));
    } else {
      const index = departmentArray.controls.findIndex(
        (dept) => dept.value === event.source.value
      );
      departmentArray.removeAt(index);
    }
  }

  public myError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  };

  formatLabel(value: number) {
    return value.toString();
  }

  submitForm() {
    const controlNames = ['department', 'image', 'gender', 'salary'];
    console.log('object :>> ', this.employeeForm.get('salary'));
    console.log('formcontols :>> ', this.employeeForm.controls);
    if (this.employeeForm.valid) {
      let newEmployee: Employee = {
        name: this.employeeForm.get('employeeName')?.value,
        department: this.employeeForm.get('department')?.value,
        profileUrl: this.employeeForm.get('image')?.value,
        gender: this.employeeForm.get('gender')?.value,
        salary: this.employeeForm.get('salary')?.value,
        startDate: this.employeeForm.get('date')?.value,
        note: this.employeeForm.get('note')?.value,
      };
      
      this.employeeService.setData(newEmployee);
      this.router.navigate([''], { state: { data: newEmployee } });
    } else {
      let i = 0;
      for (const controlName in this.employeeForm.controls) {      
        let error = this.employeeForm.controls[controlName].hasError('required');
        if (controlNames.includes(controlName) && error) {
          setTimeout(() => {
            this._snackBar.open(`${controlName} is required`, 'ok', {
              duration: 2000,
              verticalPosition: 'bottom', 
              horizontalPosition: 'end',
            });
          }, i * 2200);
          i++;
        }
     
        
      }
    }
  }
  get fullName(): FormControl {
    return this.employeeForm.get('employeeName') as FormControl;
  }

  resetForm() {
    this.employeeForm.reset();
  }
}
