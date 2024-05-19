import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  user: any;
  usersData :any;
  departmentsData :any;

  numOfNurses :number = 0;
  numOfDoctors :number = 0;
  numOfPatients :number = 0;

  numOfDepartments :number = 0;
  numOfWards :number = 0;


  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.getUserStats().subscribe(response => {
      this.usersData = response;
      this.numOfNurses = this.usersData[0].nurses;
      this.numOfDoctors = this.usersData[0].doctors;
      this.numOfPatients = this.usersData[0].patients;

      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Doctors', 'Nurses', 'Patients'],
          datasets: [{
            label: '# of Users',
            data: [this.numOfDoctors, this.numOfNurses, this.numOfPatients],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgb(203,176,32,0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgb(203,176,32,1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

    });

    this.getDepStats().subscribe(response => {
      this.departmentsData = response;
      this.numOfDepartments = this.departmentsData[0].departments;
      this.numOfWards = this.departmentsData[0].wards;
    });
  }

  getUserStats() {
    return this.http.get(`${environment.baseUrl}api/user-stats`);
  }

  getDepStats() {
    return this.http.get(`${environment.baseUrl}api/total-dep-wards`);
  }

}
