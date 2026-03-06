import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    email: '',
    password: '',
    username: '',
    mobileNumber: '',
    userRole: 'Customer'
  };
  confirmPassword = '';
  adminKey = '';
  errorMsg = '';
  successMsg = '';
  isLoading = false;
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (!this.user.email || !this.user.password || !this.user.username || !this.user.mobileNumber) {
      this.errorMsg = 'All fields are required.';
      return;
    }
    if (this.user.password !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match.';
      return;
    }
    if (this.user.password.length < 6) {
      this.errorMsg = 'Password must be at least 6 characters.';
      return;
    }
    if (!/^\d{10}$/.test(this.user.mobileNumber)) {
      this.errorMsg = 'Mobile number must be 10 digits.';
      return;
    }
    if (this.user.userRole === 'Admin' && !this.adminKey) {
      this.errorMsg = 'Admin secret key is required.';
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';

    const keyToUse = this.user.userRole === 'Admin' ? this.adminKey : undefined;

    this.authService.register(this.user, keyToUse).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMsg = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
