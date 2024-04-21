import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  usersData :any;
  departmentsData :any;

  numOfNurses :number = 0;
  numOfDoctors :number = 0;
  numOfPatients :number = 0;

  numOfDepartments :number = 0;
  numOfWards :number = 0;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserStats().subscribe(response => {
      this.usersData = response;
      this.numOfNurses = this.usersData[0].nurses;
      this.numOfDoctors = this.usersData[0].doctors;
      this.numOfPatients = this.usersData[0].patients;
    });

    this.getDepStats().subscribe(response => {
      this.departmentsData = response;
      this.numOfDepartments = this.departmentsData[0].departments;
      this.numOfWards = this.departmentsData[0].wards;
    });
  }

  getUserStats() {
    return this.http.get('http://localhost:2663/api/user-stats');
  }

  getDepStats() {
    return this.http.get('http://localhost:2663/api/total-dep-wards');
  }

}
