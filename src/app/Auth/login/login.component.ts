import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../Services/auth-service.service";
import Swal from 'sweetalert2';
import {EmailRoleService} from "../../Services/email-role.service";
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

role: string | null = null;

  constructor(private authService: AuthService, private emailRoleService: EmailRoleService, private router: Router) { }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const { email, password } = loginForm.value;
      this.authService.login(email, password).subscribe(response => {
        const { user,token } = response;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        this.role = this.emailRoleService.getRoleFromEmail(email)
        Swal.fire({
          title: 'Success!',
          text: 'Login Successful',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          console.log(this.role)
          if (this.role === 'admin') {
            this.router.navigate(['/Admin/Dashboard']);
          } else if (this.role === 'nurse') {
            this.router.navigate(['/Nurse/Dashboard']);
          } else if (this.role === 'doctor') {
            this.router.navigate(['/Doctor/Dashboard']);
          } else if (this.role === 'sa') {
            this.router.navigate(['/Super-Admin']);
          } else {
            this.router.navigate(['/user']);
          }
        });
      }, error => {
        Swal.fire({
          title: 'Error!',
          text: "Invalid email or password",
          icon: 'error',
          showConfirmButton: false,
          timer: 2500
        })
      });
    }

  }
}
