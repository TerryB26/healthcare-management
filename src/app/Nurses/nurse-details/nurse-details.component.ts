import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nurse-details',
  templateUrl: './nurse-details.component.html',
  styleUrls: ['./nurse-details.component.css']
})
export class NurseDetailsComponent {
  nurseDetails: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.getnurseDetails(id);
    });
  }

  getnurseDetails(id: string): void {
    this.http.get(`${environment.baseUrl}api/nurse-details/${id}`).subscribe(response => {
      this.nurseDetails = response;
      console.log(this.nurseDetails);
    }, error => {
      console.error('There was an error!', error);
    });
  }
}
