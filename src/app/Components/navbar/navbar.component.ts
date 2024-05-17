import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../Services/auth-service.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/Login']);
  }

}
