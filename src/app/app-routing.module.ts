import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./Admin/dashboard/dashboard.component";
import {DepartmentsComponent} from "./Admin/departments/departments.component";
import {DepDetailsComponent} from "./Admin/dep-details/dep-details.component";
import {OurNursesComponent} from "./Admin/our-nurses/our-nurses.component";
import {OurDoctorsComponent} from "./Admin/our-doctors/our-doctors.component";
import {LoginComponent} from "./Auth/login/login.component";
import {OurPatienceComponent} from "./Admin/our-patience/our-patience.component";
import {MyAppointmentsComponent} from "./Patients/my-appointments/my-appointments.component";
import {MyPrescriptionsComponent} from "./Patients/my-prescriptions/my-prescriptions.component";
import {AddAdminComponent} from "./Admin/Users/add-admin/add-admin.component";
import {AddDoctorComponent} from "./Admin/Users/add-doctor/add-doctor.component";
import {AddNurseComponent} from "./Admin/Users/add-nurse/add-nurse.component";
import {DoctorDetailsComponent} from "./Doctors/doctor-details/doctor-details.component";
import {NurseDetailsComponent} from "./Nurses/nurse-details/nurse-details.component";



const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  //Admin
  {path: 'Admin/Dashboard', component: DashboardComponent},
  {path: 'Admin/Departments', component: DepartmentsComponent},
  {path: 'Admin/Departments/:id', component: DepDetailsComponent},
  {path: 'Admin/Staff/Our-Doctors', component: OurDoctorsComponent},
  {path: 'Admin/Staff/Our-Nurses', component: OurNursesComponent},
  {path: 'Admin/Staff/Our-Patients', component: OurPatienceComponent},
  {path: 'Admin/Create/Admin-Account', component: AddAdminComponent},
  {path: 'Admin/Create/Doctor-Account', component: AddDoctorComponent},
  {path: 'Admin/Create/Nurse-Account', component: AddNurseComponent},
  // {path: 'Admin/Create/Patient-Account', component: },
  //Patient
  {path: 'Patient/My-Appointments', component: MyAppointmentsComponent},
  {path: 'Patient/My-Prescriptions', component: MyPrescriptionsComponent},
  //Doctors
  {path: 'Admin/Staff/Our-Doctors/:id', component: DoctorDetailsComponent},
  {path: 'Admin/Staff/Our-Nurses/:id', component: NurseDetailsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

