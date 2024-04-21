import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-our-doctors',
  templateUrl: './our-doctors.component.html',
  styleUrls: ['./our-doctors.component.css']
})
export class OurDoctorsComponent {
  doctors: any = [];
  

}
