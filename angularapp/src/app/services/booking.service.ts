import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookingService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /** Add a new booking */
  addBooking(booking: Booking): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/booking`, booking, {
      headers: this.getHeaders()
    });
  }

  /** Get bookings for current user */
  getBookingsByUserId(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.apiUrl}/api/user/${userId}`, {
      headers: this.getHeaders()
    });
  }

  /** Update a booking */
  updateBooking(booking: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/booking/${booking.bookingId}`, booking, {
      headers: this.getHeaders()
    });
  }

  /** Delete a booking by ID */
  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/booking/${bookingId}`, {
      headers: this.getHeaders()
    });
  }

  /** Get all bookings (admin) */
  getAllBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/booking`, {
      headers: this.getHeaders()
    });
  }
}
