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
import * as moment from 'moment';
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
      Validators.pattern('^[A-Z]{1}[a-zA-Z\\s]{2,}$'),
    ]),
    image: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    department: new FormArray([], Validators.required),
    salary: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
  });
  errorData: any = {};
  submit: boolean = false;
  update: boolean = false;
  currentEmployeeId: any;
  today:Date=new Date()
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.router.url == '/add') {
      this.submit = true;
    } else {
      this.update = true;
      this.route.params.subscribe((params) => {
        this.currentEmployeeId = params['id'];   
        this.fetchEmployeeData()
      });
    }
  }

  isChecked(department:string){
    if(this.update){
      const departmentArray: FormArray = this.employeeForm.get(
        'department'
      ) as FormArray;
      const index = departmentArray.controls.findIndex(
        (dept) => dept.value === department
      );
      return index!==-1?true:false;
    }
    return false;
  }

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
      const formattedDate = moment(this.employeeForm.get('date')?.value).format(
        'DD MMM YYYY'
      );
      let newEmployee: Employee = {
        name: this.employeeForm.get('employeeName')?.value,
        departments: this.employeeForm.get('department')?.value,
        profilePic: this.employeeForm.get('image')?.value,
        gender: this.employeeForm.get('gender')?.value,
        salary: this.employeeForm.get('salary')?.value,
        startDate: formattedDate,
        note: this.employeeForm.get('note')?.value,
      };
      if (this.submit) {
        this.addEmployee(newEmployee);
      } else {
        this.updateEmployee(newEmployee);
      }
    } else {
      let i = 0;
      for (const controlName in this.employeeForm.controls) {
        let error =
          this.employeeForm.controls[controlName].hasError('required');
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

  updateEmployee(employee: Employee) {
    this.employeeService
      .updateEmployee(this.currentEmployeeId, employee)
      .subscribe({
        next: (result) => {
          console.log('result :>> ', result);
          this._snackBar.open(`Employee data successfully updated`, 'ok', {
            duration: 6000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
          this.router.navigate(['']);
          
        },
        error: (error) => {
          if (error.error.data) {
            this.errorData = error.error.data;
            console.log('object :>> ', this.errorData);
          }
        },
      });
  }
  
  addEmployee(employee: Employee) {
    this.employeeService.addEmployee(employee).subscribe({
      next: (result) => {
        console.log('result :>> ', result);
        this._snackBar.open(`Employee data successfully added`, 'ok', {
          duration: 6000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
        this.router.navigate(['']);
      },
      error: (error) => {
        if (error.error.data) {
          this.errorData = error.error.data;
          console.log('object :>> ', this.errorData);
        }
      },
    });
  }
  get fullName(): FormControl {
    return this.employeeForm.get('employeeName') as FormControl;
  }

  resetForm() {
    this.employeeForm.reset();
  }

 fetchEmployeeData() {
  this.employeeService
          .getEmployeeData(this.currentEmployeeId)
          .subscribe((result) => {
            let employeeData:Employee = result.data;
            console.log(new Date(employeeData.startDate))
          
            this.employeeForm.patchValue({
              employeeName: employeeData.name,
              image: employeeData.profilePic,
              gender: employeeData.gender,
              department: employeeData.departments,
              salary: employeeData.salary,
              date: new Date(employeeData.startDate),
              note:employeeData.note
            });
            const departmentArray: FormArray = this.employeeForm.get(
              'department'
            ) as FormArray;
             employeeData.departments.forEach((dept)=>{
              departmentArray.push(new FormControl(dept));
             })
            console.log(this.employeeForm.get('department')?.value)
          });
}
}
