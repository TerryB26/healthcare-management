import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../environments/environment';
import Swal from "sweetalert2";

@Component({
  selector: 'app-our-nurses',
  templateUrl: './our-nurses.component.html',
  styleUrls: ['./our-nurses.component.css']
})
export class OurNursesComponent {
  nurses: any = [];
  nurse_id: any;
  user_id: any;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getData().subscribe(response => {
      this.nurses = response;
      console.log(this.nurses)
    });
  }

  getData() {
    return this.http.get(`${environment.baseUrl}api/nurses`);

  }


  deleteNurse(param: { nurse_id: any; user_id: any; }) {
    const { user_id, nurse_id } = param;
    this.http.delete(`${environment.baseUrl}api/delete-nurse/${user_id}/${nurse_id}`).subscribe(response => {
      Swal.fire({
        title: 'Success!',
        text: 'Successfully Removed Record',
        icon: 'success',
        showConfirmButton: false,
        timer: 1750
      })
      // Refresh the list of nurses after successful deletion
      this.getData().subscribe(response => {
        this.nurses = response;
      });
    }, error => {
      console.error(error);
    });

  }
}
