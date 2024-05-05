import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RandomReferenceService} from "../../../Services/random-reference.service";

function generateRandomNumber() {
  return Math.floor(Math.random() * 9000) + 1;
}

@Component({
  selector: 'app-add-nurse',
  templateUrl: './add-nurse.component.html',
  styleUrls: ['./add-nurse.component.css']
})
export class AddNurseComponent implements OnInit {

  userReferenceNum :any;
  constructor(private http: HttpClient) {
    let userReference = new RandomReferenceService();
    this.userReferenceNum = userReference.GetRefNum("Nurse");
  }

  showSuccessMessage = false;
  userSurname = '';
  userName = '';
  emailNum = generateRandomNumber();
  userSurnameFirstLetter = '';
  roleName = 'nurse';
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
    });
    this.getLastUserData().subscribe(response => {
      this.lastUserData = response;
      this.lastActiveUser = this.lastUserData[0].last_user;
    });
    this.getWards().subscribe(response => {
      this.wardsData = response;
    });
  }

  sendData(formData: any) {
    this.http.post('http://localhost:2663/api/create-nurses', formData).subscribe(response => {
      console.log(response);
      this.showSuccessMessage = true;

    }, error => {
      console.error(error);
      this.showSuccessMessage = false;
    });
  }

  onSubmit(addNurseForm: NgForm) {
    addNurseForm.value.user_id = this.lastActiveUser + 1;
    addNurseForm.value.user_password = this.dummyPassword;
    addNurseForm.value.is_active = this.activeAccount;
    addNurseForm.value.user_reference = this.userReferenceNum;
    this.sendData(addNurseForm.value);
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
