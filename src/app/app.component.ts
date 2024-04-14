import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hms';
  constructor(private http:HttpClient, public router: Router){
  }

  onSubmit(dummyForm: NgForm) {
    console.log(dummyForm.value);

  }
}
