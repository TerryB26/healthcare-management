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
    LoginComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
