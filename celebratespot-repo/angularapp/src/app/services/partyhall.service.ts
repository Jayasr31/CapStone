import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartyHall } from '../models/partyhall.model';
import { Review } from '../models/review.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PartyhallService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addPartyHall(partyHall: PartyHall): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/PartyHall`, partyHall, {
      headers: this.getHeaders()
    });
  }

  getAllPartyHalls(): Observable<PartyHall[]> {
    return this.http.get<PartyHall[]>(`${this.apiUrl}/api/PartyHall`, {
      headers: this.getHeaders()
    });
  }

  getPartyHallById(partyHallId: number): Observable<PartyHall> {
    return this.http.get<PartyHall>(`${this.apiUrl}/api/PartyHall/${partyHallId}`, {
      headers: this.getHeaders()
    });
  }

  updatePartyHall(partyHall: PartyHall): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/PartyHall/${partyHall.partyHallId}`, partyHall, {
      headers: this.getHeaders()
    });
  }

  deletePartyHall(partyHallId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/PartyHall/${partyHallId}`, {
      headers: this.getHeaders()
    });
  }

  addReview(review: Review): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Review`, review, {
      headers: this.getHeaders()
    });
  }

  getAllReviews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/Review`, {
      headers: this.getHeaders()
    });
  }

  getReviewsByUserId(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.apiUrl}/api/Review/${userId}`, {
      headers: this.getHeaders()
    });
  }
}
