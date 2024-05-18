import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {NgForm} from "@angular/forms";
import { environment } from '../environments/environment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'hms';
  randomNumber :number = 0;

  constructor(private http:HttpClient, public router: Router,){

  }

  SendEmail() {
    const emailData = {
      recipient: 'kamopmkwanazi@gmail.com', // replace with the actual recipient's email address
      subject: 'Subject of the email', // replace with the actual subject
      message: 'Message of the email', // replace with the actual message
    };



    this.http.post(`${environment.baseUrl}api/send-email`, emailData).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }

  ngOnInit(): void {
  }
}
