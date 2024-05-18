import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-our-doctors',
  templateUrl: './our-doctors.component.html',
  styleUrls: ['./our-doctors.component.css']
})
export class OurDoctorsComponent implements OnInit {
  doctors: any = [];
  doctor_id: any;
  user_id: any;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getData().subscribe(response => {
      this.doctors = response;
    });
  }

  getData() {
    return this.http.get(`${environment.baseUrl}api/doctors`);
  }


  deleteDoctor(param: { doctor_id: any; user_id: any; }) {
    const { user_id, doctor_id } = param;
      this.http.delete(`${environment.baseUrl}api/delete-doctor/${user_id}/${doctor_id}`).subscribe(response => {
        Swal.fire({
          title: 'Success!',
          text: 'Successfully Removed Record',
          icon: 'success',
          showConfirmButton: false,
          timer: 1750
        })


        // Refresh the list of doctors after successful deletion
        this.getData().subscribe(response => {
          this.doctors = response;
        });
      }, error => {
        console.error(error);
      });

    }
  }
