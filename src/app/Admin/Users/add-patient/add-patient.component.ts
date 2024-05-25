import { Component } from '@angular/core';
import { FormsModule, NgForm, AbstractControl, ValidatorFn } from "@angular/forms";
import {environment} from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RandomReferenceService } from "../../../Services/random-reference.service";
import {NgForOf} from "@angular/common";

function generateRandomNumber() {
  return Math.floor(Math.random() * 9000) + 1;
}
@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {
  wardsData: any;
  conditionsData: any;
  userSurname: any;
  fullEmail: any;
  emailNum = generateRandomNumber();
  roleName = 'patient';
  baseEmail = '@' + this.roleName + '-hospital.co.za';
  dummyPassword = 1234;
  activeAccount = 1;
  lastUserData: any;
  lastActiveUser: number = 0;
  showSuccessMessage = false;
  userReferenceNum: any;
  userSurnameFirstLetter = '';
  role_id = 4;

  lastRelative: any;
  lastRelativeData: any;
  lastPatient: any;
  lastPatientData: any;
  file_name: any;

  user: any;

  generateFileName(idNumber: string, surname: string): string {
    const idDigits = idNumber.slice(0, 6);
    const surnameChars = surname.charAt(0).toUpperCase() + surname.slice(1, 3).toLowerCase();
    return `${idDigits}${surnameChars}`;
  }

  constructor(private http: HttpClient, private router: Router) {
    let userReference = new RandomReferenceService();
    this.userReferenceNum = userReference.GetRefNum("Patient");
  }

  ngOnInit(): void {
    this.getWards().subscribe(response => {
      this.wardsData = response;
    });

    this.getPatientsConditions().subscribe(response => {
      this.conditionsData = response;
    });
    //User
    this.getLastUserData().subscribe(response => {
      this.lastUserData = response;
      this.lastActiveUser = this.lastUserData[0].last_user;
    });
    //Relative
    this.getLastRelative().subscribe(response => {
      this.lastRelativeData = response;
      this.lastRelative = this.lastRelativeData.lastRelativeId;
    });
    //Patient
    this.getLastPatient().subscribe(response => {
      this.lastPatientData = response;
      this.lastPatient = this.lastPatientData.lastPatientId;
    });

    this.user = JSON.parse(localStorage.getItem('user') || '{}');

  }

  onUserSurnameChange() {
    this.userSurnameFirstLetter = this.userSurname;
    this.updateFullEmail();
  }

  onSubmit(addPatientForm: NgForm) {


  //   User Table
    addPatientForm.value.user_id = this.lastActiveUser + 1;
    addPatientForm.value.user_reference = this.userReferenceNum;
    addPatientForm.value.user_email = this.fullEmail;
    addPatientForm.value.user_password = this.dummyPassword;
    addPatientForm.value.role_id = 4;
    addPatientForm.value.is_active = this.activeAccount;

    addPatientForm.value.lastPatientID = this.lastPatient + 1;
    addPatientForm.value.lastrelativeID = this.lastRelative + 1;
    addPatientForm.value.editedBy = this.user.user_email;
    addPatientForm.value.file_name = this.generateFileName(addPatientForm.value.patientIdNumber, addPatientForm.value.patientSurname);

    this.sendData(addPatientForm.value);
  }


  sendData(formData: any) {
    this.http.post(`${environment.baseUrl}api/create-patients`, formData).subscribe(response => {
      Swal.fire({
        title: 'Success!',
        text: 'Successfully Admitted Patient.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        this.router.navigate(['/Admin/Dashboard']);
      });
    }, error => {
      console.error(error);
      this.showSuccessMessage = false;
    });
  }
  updateFullEmail() {
    this.fullEmail = `${this.userSurname}${this.emailNum}${this.baseEmail}`;
  }
  getWards() {
    return this.http.get(`${environment.baseUrl}api/department-wards`);
  }

  getPatientsConditions() {
    return this.http.get(`${environment.baseUrl}api/health-conditions`);
  }
  private getLastUserData() {
    return this.http.get(`${environment.baseUrl}api/last-active-user`);
  }

  getLastRelative(){
    return this.http.get(`${environment.baseUrl}api/lastRelativeId`);
  }

  getLastPatient(){
    return this.http.get(`${environment.baseUrl}api/lastPatientId`);
  }

}
