import { Component } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.css']
})
export class NurseDashboardComponent {
  nurses: any = [];
  doctors: any = [];
  user: any;
  ward_id: any;
  nurse_id: any;
  user_id: any;
  nurseCount: any;
  doctorCount: any;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.ward_id = this.user.nurse_ward_id;
    this.user_id = this.user.user_id;

    this.getDoctorData(this.ward_id).subscribe(response => {
      this.doctors = response;
      this.doctorCount = this.doctors.length;
    });

    this.getData(this.ward_id).subscribe(response => {
      this.nurses = response;
      this.nurseCount = this.nurses.length;
    });


  }

  getData(nurseWardId?: number) {
    let params = new HttpParams();
    if (nurseWardId) {
      params = params.append('nurse_ward_id', nurseWardId.toString());
    }
    return this.http.get(`${environment.baseUrl}api/nurses`, { params });
  }
  getDoctorData(doctorWardId?: number) {
    let params = new HttpParams();
    if (doctorWardId) {
      params = params.append('doctor_ward_id', doctorWardId.toString());
    }
    return this.http.get(`${environment.baseUrl}api/doctors`, { params });
  }
}
