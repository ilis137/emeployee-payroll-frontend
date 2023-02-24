import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:"dashboard",
    pathMatch: 'full'
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    pathMatch: 'full'
  },

  {
    path: 'add',
    component:AddEmployeeComponent,
    pathMatch:'full'
  },
  {
    path: 'update/:id',
    component:AddEmployeeComponent,
    pathMatch:'full'
  },
  {
    path: '**',
    component:PageNotFoundComponent,
    pathMatch:'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
