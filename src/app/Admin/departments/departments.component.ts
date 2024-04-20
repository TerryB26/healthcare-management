import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  data: any;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData().subscribe(response => {
      this.data = response;
      console.log(this.data);
    });
  }

  getData() {
    return this.http.get('http://localhost:2663/api/hospital-departments');
  }


}
