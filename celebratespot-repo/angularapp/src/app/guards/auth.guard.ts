import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Role-based guard
    const expectedRole = route.data?.['role'];
    if (expectedRole && this.authService.getUserRole() !== expectedRole) {
      // Redirect based on actual role
      const role = this.authService.getUserRole();
      if (role === 'Admin') {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/customer-dashboard']);
      }
      return false;
    }

    return true;
  }
}
