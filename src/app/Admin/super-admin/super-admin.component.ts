import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from '../../../environments/environment';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";
import { Router } from '@angular/router';
import Swal from "sweetalert2";


@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent {

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
  doctorLicense: any;
  admins: any;
  adminCount: any;
  key: any;
  base_key: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.getData().subscribe(response => {
      this.admins = response;
      this.adminCount = this.admins.length;
    });


  }

  getData() {
    return this.http.get(`${environment.baseUrl}api/admins`);
  }

  getLatestBaseKey() {
    return this.http.get(`${environment.baseUrl}api/recent-basekeys`);
  }

  giveAccessClick(user_id: any) {
    Swal.fire({
      title: 'Proceed To Scan The RFID',
      text: "This will give access rights to the selected admin",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continue',
      cancelButtonText: 'Cancel',
      width: '800px'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked 'Continue', perform your action here
        this.getLatestBaseKey().subscribe(response => {
          this.key = response;
          console.log(this.key)
          if (this.key.length === 0) {
            Swal.fire({
              title: 'Error!',
              text: 'Please rescan the RFID',
              icon: 'error',
              timer: 3000, // Set the timer here
              showConfirmButton: false
            }).then(() => {
              // Try scanning again after the timer ends
            });
          } else {
            this.base_key = this.key[0].base_key;
            this.sendData(this.base_key, this.user_id);
          }
        });

      } else {
        // User clicked 'Cancel', perform your action here
      }
    });
    console.log(user_id)
    this.user_id = user_id;

  }

  sendData(baseKey: any, userId: any) {
    this.http.put(`http://localhost:3000/api/update-base-keys/${userId}`, { base_key: baseKey }).subscribe(response => {
      Swal.fire({
        title: 'Success!',
        text: 'The Pass key for this admin is ' + this.base_key + ' Please give it to the admin',
        icon: 'success',
        confirmButtonText: 'Done'
      }).then(() => {
        // Re-fetch the patient data
        this.getData().subscribe(response => {
          this.admins = response;
          this.adminCount = this.admins.length;
        });
      });
    }, error => {
      console.error(error);
      this.showSuccessMessage = false;
    });
  }
}
