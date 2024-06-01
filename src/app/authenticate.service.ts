import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private loginUrl = 'https://library-backend-xsed.onrender.com/api/login';
  private signupUrl = 'https://library-backend-xsed.onrender.com/api/signup';
  private adminLoginUrl = 'https://library-backend-xsed.onrender.com/api/admin/login';
  private loggedIn = false;
  private userRole = ''; 
  private fullName = '';

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    this.loggedIn = !!token;
    return this.loggedIn;
  }

  getFullName(): string {
    return this.fullName;
  }

  getUserRole(): string {
    return this.userRole;
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, user).pipe(
      tap(response => {
        this.loggedIn = true;
        localStorage.setItem('token', response.token);
        this.fullName = response.fullName; 
        this.userRole = response.role; 
      }),
      catchError(this.handleError)
    );
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(this.signupUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  adminLogin(adminUser: any): Observable<any> {
    return this.http.post<any>(this.adminLoginUrl, adminUser).pipe(
      tap(response => {
        this.loggedIn = true;
        localStorage.setItem('token', response.token);
        this.fullName = response.fullName; 
        this.userRole = 'admin'; 
      }),
      catchError(this.handleError

)
);
}

logout(): void {
this.loggedIn = false;
this.userRole = '';
this.fullName = '';
localStorage.removeItem('token');
}

private handleError(error: any): Observable<never> {
  console.error('An error occurred in AuthenticateService:', error);
  return throwError(error);
}
}