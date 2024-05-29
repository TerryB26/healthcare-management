import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from '../../../environments/environment';
import {DatePipe, NgForOf} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";
import { Router } from '@angular/router';
import Swal from "sweetalert2";
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
  patientsCount: any;
  patients: any;
  conditionsData: any;
  showSuccessMessage = false;
  conditionID : any;
  fileID: any;
  patientID: any;
  created_by: any;

  appointments: any;
  appointmentCount: any;


  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.ward_id = this.user.nurse_ward_id;
    this.user_id = this.user.user_id;
    this.created_by = this.user.user_email;

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

    this.getAppointments(this.created_by).subscribe(response => {
      this.appointments = response;console.log(this.appointments);
      this.appointmentCount = this.appointments.length;
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
    this.http.put(`${environment.baseUrl}api/update-patient-status/${this.fileID}`, formData).subscribe(response => {
      Swal.fire({
        title: 'Success!',
        text: 'Successfully Updated Patient File',
        icon: 'success',
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        this.router.navigate(['/Nurse/Dashboard']);
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

  getConditionColor(condition: string): string {
    switch (condition) {
      case 'Satisfactory':
        return 'green';
      case 'Good':
        return 'lightgreen';
      case 'Fair':
        return 'gold';
      case 'Guarded':
        return 'orange';
      case 'Stable':
        return 'blue';
      case 'Serious':
        return 'red';
      case 'Critical':
        return 'darkred';
      default:
        return 'black';
    }
  }

  appointModal(patient_id: any) {
    this.patientID = patient_id;
    console.log(this.patientID)
  }

  onSubmitAppointment(bookAppointmentForm: NgForm) {
    bookAppointmentForm.value.patient_id = this.patientID;
    bookAppointmentForm.value.created_by = this.created_by;
    console.log(bookAppointmentForm.value);
    this.sendAppointmentData(bookAppointmentForm.value);
  }

  private sendAppointmentData(formData: any) {
    this.http.post(`${environment.baseUrl}api/create-appointment`, formData).subscribe(response => {
      Swal.fire({
        title: 'Success!',
        text: 'Successfully Updated Patient File',
        icon: 'success',
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        this.router.navigate(['/Nurse/Dashboard']);
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

  getAppointments(createdByEmail?: any) {
    let params = new HttpParams();
    if (createdByEmail) {
      params = params.append('createdByEmail', createdByEmail.toString());
    }
    return this.http.get(`${environment.baseUrl}api/appointments`, { params });
  }

  getAppStatusColor(appStatus: string): string {
    switch (appStatus) {
      case 'Awaiting Approval':
        return 'gold';
      case 'Accepted':
        return 'darkgreen';
      case 'Declined':
        return 'darkred';
      default:
        return 'black';
    }
  }
}
