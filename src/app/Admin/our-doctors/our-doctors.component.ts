import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-our-doctors',
  templateUrl: './our-doctors.component.html',
  styleUrls: ['./our-doctors.component.css']
})
export class OurDoctorsComponent implements OnInit {
  doctors: any = [];

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getData().subscribe(response => {
      this.doctors = response;
      console.log(this.doctors);
    });
  }

  getData() {
    return this.http.get('http://localhost:2663/api/doctors');
  }


  deleteDoctor(user_id: any) {
    console.log(user_id);
  }
}
