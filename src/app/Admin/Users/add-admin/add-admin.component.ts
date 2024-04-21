import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";


function generateRandomNumber() {
  return Math.floor(Math.random() * 9000) + 1;
}

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})


export class AddAdminComponent {
  constructor(private http: HttpClient) { }
  showSuccessMessage = false;
  userSurname = '';
  userName = '';
  emailNum = generateRandomNumber();
  userSurnameFirstLetter = '';
  roleName = 'admin';
  baseEmail = '@'+this.roleName+'-hospital.co.za';
  rolesData :any;
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
      //console.log(this.lastActiveUser);
    });
  }

  getData() {
    return this.http.get(`http://localhost:2663/api/role/${this.roleName}`);
  }

  onUserSurnameChange() {
    this.userSurnameFirstLetter = this.userSurname[0];
  }

  onSubmit(addAdminForm: NgForm) {
    addAdminForm.value.user_id = this.lastActiveUser + 1;
    addAdminForm.value.user_password = this.dummyPassword;
    addAdminForm.value.is_active = this.activeAccount;
    console.log(addAdminForm.value);
    this.sendData(addAdminForm.value);
  }

  //Send data to the server
  sendData(formData: any) {
    this.http.post('http://localhost:2663/api/create-admins', formData).subscribe(response => {
      console.log(response);
      this.showSuccessMessage = true;
    }, error => {
      console.error(error);
      this.showSuccessMessage = false;
    });
  }

  private getLastUserData() {
    return this.http.get('http://localhost:2663/api/last-active-user');
  }
}
