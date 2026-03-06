import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Register a new user
   * Admin registration requires X-Admin-Key header with value: ADMIN_SECRET_2024
   */
  register(user: User, adminKey?: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (adminKey) {
      headers = headers.set('X-Admin-Key', adminKey);
    }
    return this.http.post(`${this.apiUrl}/api/register`, user, { headers }).pipe(
      tap((res: any) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      }),
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Login and store JWT token data in localStorage
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, { email, password }).pipe(
      tap((res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userId?.toString() || '');
          localStorage.setItem('userRole', res.userRole || '');
          localStorage.setItem('username', res.username || '');
        }
      }),
      catchError(err => throwError(() => err))
    );
  }

  /** Logout and clear localStorage */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string {
    return localStorage.getItem('userRole') || '';
  }

  getUserId(): number {
    return parseInt(localStorage.getItem('userId') || '0', 10);
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
