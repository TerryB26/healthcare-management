import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./Admin/dashboard/dashboard.component";
import {DepartmentsComponent} from "./Admin/departments/departments.component";
import {DepDetailsComponent} from "./Admin/dep-details/dep-details.component";
import {OurNursesComponent} from "./Admin/our-nurses/our-nurses.component";
import {OurDoctorsComponent} from "./Admin/our-doctors/our-doctors.component";
import {LoginComponent} from "./Auth/login/login.component";



const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Admin/Dashboard', component: DashboardComponent},
  {path: 'Admin/Departments', component: DepartmentsComponent},
  {path: 'Admin/Departments/:id', component: DepDetailsComponent},
  {path: 'Admin/Staff/Our-Doctors', component: OurDoctorsComponent},
  {path: 'Admin/Staff/Our-Nurses', component: OurNursesComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

