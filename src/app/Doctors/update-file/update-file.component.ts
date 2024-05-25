import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from '../../../environments/environment';
import {DatePipe, NgForOf} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-file',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    DatePipe
  ],
  templateUrl: './update-file.component.html',
  styleUrl: './update-file.component.css'
})
export class UpdateFileComponent {
  patientsCount: any;
  patients: any = [];
  user_email: any;
  patientReference: any;
  fileID: any;
  showSuccessMessage = false;
  user: any;
  length: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.patientReference = params['patientReference'];
      this.fileID = params['id'];

      // Now you can use patientReference
    });

    this.getPatientsData(this.fileID).subscribe(response => {
      this.patients = response;
      this.length = this.patients.length;
    });

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user_email = this.user.user_email;
  }

  getPatientsData(file_id?: number) {
    let params = new HttpParams();
    if (file_id) {
      params = params.append('file_id', file_id.toString());
    }
    return this.http.get(`${environment.baseUrl}api/patients`, { params });
  }

  onSubmit(updateFileForm: NgForm) {
    console.log(updateFileForm.value);
    updateFileForm.value.medical_history = this.patients[0].medical_history;
    updateFileForm.value.previous_treatment = this.patients[0].previous_treatment;
    updateFileForm.value.updated_by = this.user_email;
    this.sendData(updateFileForm.value);
  }

  getLastPatient() {
    return this.patients[this.length - 1];
  }


  sendData(formData: any) {
    this.http.put(`http://localhost:3000/api/update-patient-file/${this.fileID}`, formData).subscribe(response => {
      Swal.fire({
        title: 'Success!',
        text: 'Successfully Updated Patient File',
        icon: 'success',
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        this.router.navigate(['/Doctor/Dashboard']);
      });
    }, error => {
      console.error(error);
      this.showSuccessMessage = false;
    });
  }
}
