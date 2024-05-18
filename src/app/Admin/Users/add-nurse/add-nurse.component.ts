import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { RandomReferenceService } from "../../../Services/random-reference.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

function generateRandomNumber() {
  return Math.floor(Math.random() * 9000) + 1;
}

@Component({
  selector: 'app-add-nurse',
  templateUrl: './add-nurse.component.html',
  styleUrls: ['./add-nurse.component.css']
})
export class AddNurseComponent implements OnInit {
  userReferenceNum: any;
  showSuccessMessage = false;
  userSurname = '';
  userName = '';
  emailNum = generateRandomNumber();
  userSurnameFirstLetter = '';
  roleName = 'nurse';
  baseEmail = '@' + this.roleName + '-hospital.co.za';
  rolesData: any;
  wardsData: any;
  dummyPassword = 1234;
  activeAccount = 1;
  lastUserData: any;
  lastActiveUser: number = 0;
  fullEmail = '';

  constructor(private http: HttpClient, private router: Router) {
    let userReference = new RandomReferenceService();
    this.userReferenceNum = userReference.GetRefNum("Nurse");
  }

  ngOnInit(): void {
    this.getData().subscribe(response => {
      this.rolesData = response;
    });
    this.getLastUserData().subscribe(response => {
      this.lastUserData = response;
      this.lastActiveUser = this.lastUserData[0].last_user;
    });
    this.getWards().subscribe(response => {
      this.wardsData = response;
    });
  }

  getData() {
    return this.http.get(`${environment.baseUrl}api/role/${this.roleName}`);
  }

  getWards() {
    return this.http.get(`${environment.baseUrl}api/department-wards`);
  }

  onUserSurnameChange() {
    this.userSurnameFirstLetter = this.userSurname[0];
    this.updateFullEmail();
  }

  onUserNameChange() {
    this.updateFullEmail();
  }

  onSubmit(addNurseForm: NgForm) {
    addNurseForm.value.user_id = this.lastActiveUser + 1;
    addNurseForm.value.user_password = this.dummyPassword;
    addNurseForm.value.is_active = this.activeAccount;
    addNurseForm.value.user_reference = this.userReferenceNum;
    addNurseForm.value.user_email = this.fullEmail;
    this.sendData(addNurseForm.value);
  }

  updateFullEmail() {
    this.fullEmail = `${this.userName}${this.userSurnameFirstLetter}${this.emailNum}${this.baseEmail}`;
  }

  sendData(formData: any) {
    this.http.post(`${environment.baseUrl}api/create-nurses`, formData).subscribe(response => {
      Swal.fire({
        title: 'Success!',
        text: 'Successfully Added A New Nurse',
        icon: 'success',
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        this.router.navigate(['/Admin/Staff/Our-Nurses']);
      });
    }, error => {
      console.error(error);
      this.showSuccessMessage = false;
    });
  }

  private getLastUserData() {
    return this.http.get(`${environment.baseUrl}api/last-active-user`);
  }
}
