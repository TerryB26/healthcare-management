import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RandomReferenceService} from "../../../Services/random-reference.service";

function generateRandomNumber() {
  return Math.floor(Math.random() * 9000) + 1;
}

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  userReferenceNum :any;

  constructor(private http: HttpClient) {
    let userReference = new RandomReferenceService();
    this.userReferenceNum = userReference.GetRefNum("Doctor");
  }
  showSuccessMessage = false;
  userSurname = '';
  userName = '';
  emailNum = generateRandomNumber();
  userSurnameFirstLetter = '';
  roleName = 'doctor';
  baseEmail = '@'+this.roleName+'-hospital.co.za';
  rolesData :any;
  wardsData :any;
  dummyPassword = 1234;
  activeAccount = 1;
  lastUserData :any;
  lastActiveUser: number = 0;

  ngOnInit(): void {
    this.getData().subscribe(response => {
      this.rolesData = response;
      //console.log(this.rolesData);
    });
    this.getLastUserData().subscribe(response => {
      this.lastUserData = response;
      this.lastActiveUser = this.lastUserData[0].last_user;
      //console.log("Last User: " + this.lastActiveUser);
    });
    this.getWards().subscribe(response => {
      this.wardsData = response;
      //console.log(this.wardsData);
    });
  }

  sendData(formData: any) {
    this.http.post('http://localhost:2663/api/create-doctors', formData).subscribe(response => {
      console.log(response);
      this.showSuccessMessage = true;

    }, error => {
      console.error(error);
      this.showSuccessMessage = false;
    });
  }

  onSubmit(addDoctorForm: NgForm) {
    addDoctorForm.value.user_id = this.lastActiveUser + 1;
    addDoctorForm.value.user_password = this.dummyPassword;
    addDoctorForm.value.is_active = this.activeAccount;
    addDoctorForm.value.user_reference = this.userReferenceNum;
    this.sendData(addDoctorForm.value);
  }

  getData() {
    return this.http.get(`http://localhost:2663/api/role/${this.roleName}`);
  }

  getWards(){
    return this.http.get('http://localhost:2663/api/department-wards');
  }

  onUserSurnameChange() {
    this.userSurnameFirstLetter = this.userSurname[0];
  }

  private getLastUserData() {
    return this.http.get('http://localhost:2663/api/last-active-user');
  }
}
