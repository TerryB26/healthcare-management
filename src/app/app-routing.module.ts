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
import { DoctorDashboardComponent } from './Doctors/doctor-dashboard/doctor-dashboard.component';
import { NurseDashboardComponent } from './Nurses/nurse-dashboard/nurse-dashboard.component';
import {PatientDashboardComponent} from "./Patients/patient-dashboard/patient-dashboard.component";
import {AuthGuard} from "./auth.guard";
import {AddPatientComponent} from "./Admin/Users/add-patient/add-patient.component";
import {UpdateFileComponent} from "./Doctors/update-file/update-file.component";
import {SuperAdminComponent} from "./Admin/super-admin/super-admin.component";


const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  //Admin
  {path: 'Admin/Dashboard', component: DashboardComponent ,canActivate : [AuthGuard]},
  {path: 'Admin/Departments', component: DepartmentsComponent ,canActivate : [AuthGuard]},
  {path: 'Admin/Departments/:id', component: DepDetailsComponent ,canActivate : [AuthGuard]},
  {path: 'Admin/Staff/Our-Doctors', component: OurDoctorsComponent ,canActivate : [AuthGuard]},
  {path: 'Admin/Staff/Our-Nurses', component: OurNursesComponent ,canActivate : [AuthGuard]},
  {path: 'Admin/Staff/Our-Patients', component: OurPatienceComponent ,canActivate : [AuthGuard]},
  {path: 'Admin/Create/Admin-Account', component: AddAdminComponent ,canActivate : [AuthGuard]},
  {path: 'Admin/Create/Doctor-Account', component: AddDoctorComponent ,canActivate : [AuthGuard]},
  {path: 'Admin/Create/Nurse-Account', component: AddNurseComponent ,canActivate : [AuthGuard]},
  {path: 'Admin/Create/Patient-Account', component: AddPatientComponent ,canActivate : [AuthGuard]},
  //Doctors
  {path: 'Admin/Staff/Our-Doctors/:id', component: DoctorDetailsComponent ,canActivate : [AuthGuard]},
  {path: 'Admin/Staff/Our-Nurses/:id', component: NurseDetailsComponent ,canActivate : [AuthGuard]},
  //Doctor Site
  {path: 'Doctor/Dashboard', component: DoctorDashboardComponent ,canActivate : [AuthGuard]},
  {path: 'Update-File/:patientReference/:id', component: UpdateFileComponent ,canActivate : [AuthGuard]},
  //Nurse Site
  {path: 'Nurse/Dashboard', component: NurseDashboardComponent ,canActivate : [AuthGuard]},
  //Patient
  {path: 'Patient/My-Appointments', component: MyAppointmentsComponent ,canActivate : [AuthGuard]},
  {path: 'Patient/My-Prescriptions', component: MyPrescriptionsComponent ,canActivate : [AuthGuard]},
  {path: 'Patient/Dashboard', component: PatientDashboardComponent ,canActivate : [AuthGuard]},
  //Super Admin
  { path: 'Super-Admin', component: SuperAdminComponent},
  { path: '**', redirectTo: '/Login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking', useHash: false })], // for Angular 11 and later
  exports: [RouterModule]
})
export class AppRoutingModule { }

