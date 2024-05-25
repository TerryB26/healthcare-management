import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-our-patience',
  templateUrl: './our-patience.component.html',
  styleUrls: ['./our-patience.component.css']
})
export class OurPatienceComponent {
  patients: any = [];
  doctor_id: any;
  user_id: any;
  selectedUserId: any;
  selectedPatient: any;

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    this.getData().subscribe(response => {
      this.patients = response;
    });
  }

  getData() {
    return this.http.get(`${environment.baseUrl}api/patients`);
  }

  getPatientData(userId: number) {
    return this.http.get(`${environment.baseUrl}api/patients?user_id=${userId}`);
  }

  deletePatient(param: { user_id: any }) {
    const {user_id} = param;

    this.http.delete(`${environment.baseUrl}api/delete-patient/${user_id}`).subscribe(response => {
      Swal.fire({
        title: 'Success!',
        text: 'Successfully Removed Record',
        icon: 'success',
        showConfirmButton: false,
        timer: 1750
      })


      // Refresh the list of doctors after successful deletion
      this.getData().subscribe(response => {
        this.patients = response;
      });
    }, error => {
      console.error(error);
    });

  }

  openModal(userId: number) {
    this.selectedUserId = userId;
    console.log(userId);
    this.getPatientData(userId).subscribe(response => {
      this.selectedPatient = response;
    });
  }
}
