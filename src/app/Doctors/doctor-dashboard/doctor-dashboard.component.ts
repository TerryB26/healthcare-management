import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from '../../../environments/environment';
import {DatePipe, NgForOf} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";
import { Router } from '@angular/router';
import Swal from "sweetalert2";



@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {

  nurses: any = [];
  doctors: any = [];
  user: any;
  ward_id: any;
  nurse_id: any;
  user_id: any;
  nurseCount: any;
  doctorCount: any;
  patientsCount: any;
  patients: any;
  conditionsData: any;
  showSuccessMessage = false;

  conditionID : any;
  fileID: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.ward_id = this.user.doctor_ward_id;
    this.user_id = this.user.user_id;

    this.getDoctorData(this.ward_id).subscribe(response => {
      this.doctors = response;
      this.doctorCount = this.doctors.length;
    });

    this.getData(this.ward_id).subscribe(response => {
      this.nurses = response;
      this.nurseCount = this.nurses.length;
    });

    this.getPatientsData(this.ward_id).subscribe(response => {
      this.patients = response;
      this.patientsCount = this.patients.length;
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

  getPatientsData(ward_id?: number) {
    let params = new HttpParams();
    if (ward_id) {
      params = params.append('ward_id', ward_id.toString());
    }
    return this.http.get(`${environment.baseUrl}api/patients`, { params });
  }

  getPatientsConditions(condition_id?: number) {
    let params = new HttpParams();
    if (condition_id) {
      params = params.append('condition_id', condition_id.toString());
    }
    return this.http.get(`${environment.baseUrl}api/health-conditions`, { params });
  }

  openModal(file_id: any, condition_id: any) {
    this.fileID = file_id;
    this.conditionID = condition_id;

    this.getPatientsConditions(condition_id).subscribe(response => {
      this.conditionsData = response;

    });

  }

  onSubmit(updateConditionForm: NgForm) {
    this.sendData(updateConditionForm.value);
  }

  sendData(formData: any) {
    this.http.put(`http://localhost:3000/api/update-patient-status/${this.fileID}`, formData).subscribe(response => {
      Swal.fire({
        title: 'Success!',
        text: 'Successfully Updated Patient File',
        icon: 'success',
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        this.router.navigate(['/Doctor/Dashboard']);
      });
      // Refetch the patient data
      this.getPatientsData(this.ward_id).subscribe(response => {
        this.patients = response;
      });
    }, error => {
      console.error(error);
      this.showSuccessMessage = false;
    });
  }
}
