import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { DepartmentsComponent } from './Admin/departments/departments.component';
import { DepDetailsComponent } from './Admin/dep-details/dep-details.component';
import { OurNursesComponent } from './Admin/our-nurses/our-nurses.component';
import { OurDoctorsComponent } from './Admin/our-doctors/our-doctors.component';
import { LoginComponent } from './Auth/login/login.component';
import {FormsModule} from "@angular/forms";
import { OurPatienceComponent } from './Admin/our-patience/our-patience.component';
import { MyAppointmentsComponent } from './Patients/my-appointments/my-appointments.component';
import { MyPrescriptionsComponent } from './Patients/my-prescriptions/my-prescriptions.component';
import { AddAdminComponent } from './Admin/Users/add-admin/add-admin.component';
import { AddDoctorComponent } from './Admin/Users/add-doctor/add-doctor.component';
import { AddNurseComponent } from './Admin/Users/add-nurse/add-nurse.component';
import { DoctorDetailsComponent } from './Doctors/doctor-details/doctor-details.component';
import { NurseDetailsComponent } from './Nurses/nurse-details/nurse-details.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    DepartmentsComponent,
    DepDetailsComponent,
    OurNursesComponent,
    OurDoctorsComponent,
    LoginComponent,
    OurPatienceComponent,
    MyAppointmentsComponent,
    MyPrescriptionsComponent,
    AddAdminComponent,
    AddDoctorComponent,
    AddNurseComponent,
    DoctorDetailsComponent,
    NurseDetailsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
      SweetAlert2Module.forRoot(),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
