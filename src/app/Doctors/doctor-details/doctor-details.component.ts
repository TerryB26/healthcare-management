import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  doctorDetails: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.getDoctorDetails(id);
    });
  }

  getDoctorDetails(id: string): void {
    this.http.get(`${environment.baseUrl}api/doctor-details/${id}`).subscribe(response => {
      this.doctorDetails = response;
      console.log(this.doctorDetails);
    }, error => {
      console.error('There was an error!', error);
    });
  }

}
