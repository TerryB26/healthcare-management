import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dep-details',
  templateUrl: './dep-details.component.html',
  styleUrls: ['./dep-details.component.css']
})
export class DepDetailsComponent implements OnInit {
  data: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.getData(id);
    });
  }

  getData(id: string): void {
    this.http.get(`http://localhost:2663/api/department-details/${id}`).subscribe(response => {
      this.data = response;
      console.log(this.data);
    }, error => {
      console.error('There was an error!', error);
    });
  }
}
