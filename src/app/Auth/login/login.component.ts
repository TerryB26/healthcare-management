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
        this.role = this.emailRoleService.getRoleFromEmail(email)
        Swal.fire({
          title: 'Success!',
          text: 'Login Successful',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.router.navigate([this.role === 'admin' ? '/Admin/Dashboard' : '/user'])
        });
        console.log(this.role);
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
