import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedLoginType: string = 'user';
  showSignUpForm: boolean = false;

  userLoginData = {
    username: '',
    password: ''
  };

  adminLoginData = {
    adminUsername: '',
    adminPassword: ''
  };

  userSignUpData = {
    fullName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthenticateService, private router: Router) {}

  selectLoginType(type: string): void {
    this.selectedLoginType = type;
    this.showSignUpForm = false;
  }

  showSignUp(event: Event): void {
    event.preventDefault();
    this.showSignUpForm = true;
  }

  showLogin(event: Event): void {
    event.preventDefault();
    this.showSignUpForm = false;
  }

  userLogin(): void {
    this.authService.login(this.userLoginData).subscribe(
      response => {
        localStorage.setItem('token', response.token); // Assuming response.token contains the token
        if (this.selectedLoginType === 'admin') {
          this.adminLogin();
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  adminLogin(): void {
    this.authService.adminLogin(this.adminLoginData).subscribe(
      response => {
        localStorage.setItem('token', response.token); // Assuming response.token contains the token
        this.router.navigate(['/admin']);
      },
      error => {
        console.error(error);
      }
    );
  }

  userSignUp(): void {
    this.authService.signup(this.userSignUpData).subscribe(
      response => {
        console.log('User signed up successfully:', response);
        // Optionally, navigate to a different page or show a success message
      },
      error => {
        console.error('Error signing up user:', error);
        // Optionally, display an error message to the user
      }
    );
  }
}
