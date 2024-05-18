import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { RandomReferenceService } from "../../../Services/random-reference.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

function generateRandomNumber() {
  return Math.floor(Math.random() * 9000) + 1;
}

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  userReferenceNum: any;
  showSuccessMessage = false;
  userSurname = '';
  userName = '';
  emailNum = generateRandomNumber();
  userSurnameFirstLetter = '';
  roleName = 'doctor';
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
    this.userReferenceNum = userReference.GetRefNum("Doctor");
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
    return this.http.get(`http://localhost:2663/api/role/${this.roleName}`);
  }

  getWards() {
    return this.http.get('http://localhost:2663/api/department-wards');
  }

  onUserSurnameChange() {
    this.userSurnameFirstLetter = this.userSurname[0];
    this.updateFullEmail();
  }

  onUserNameChange() {
    this.updateFullEmail();
  }

  onSubmit(addDoctorForm: NgForm) {
    addDoctorForm.value.user_id = this.lastActiveUser + 1;
    addDoctorForm.value.user_password = this.dummyPassword;
    addDoctorForm.value.is_active = this.activeAccount;
    addDoctorForm.value.user_reference = this.userReferenceNum;
    addDoctorForm.value.user_email = this.fullEmail;
    this.sendData(addDoctorForm.value);
  }

  updateFullEmail() {
    this.fullEmail = `${this.userName}${this.userSurnameFirstLetter}${this.emailNum}${this.baseEmail}`;
  }

  sendData(formData: any) {
    this.http.post('http://localhost:2663/api/create-doctors', formData).subscribe(response => {
      Swal.fire({
        title: 'Success!',
        text: 'Successfully added a new Doctor',
        icon: 'success',
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        this.router.navigate(['/Admin/Staff/Our-Doctors']);
      });
    }, error => {
      console.error(error);
      this.showSuccessMessage = false;
    });
  }

  private getLastUserData() {
    return this.http.get('http://localhost:2663/api/last-active-user');
  }
}
