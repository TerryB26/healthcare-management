import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = `${environment.baseUrl}api/login`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true // Include this to send cookies with the request
    };
    return this.http.post<any>(this.loginUrl, { email, password }, httpOptions);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null && localStorage.getItem('token') !== null;
  }
}
