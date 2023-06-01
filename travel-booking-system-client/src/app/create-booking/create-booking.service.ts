import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateBookingService {
  private baseUrl = "http://localhost:8081/api/v1";

  constructor(private http: HttpClient) { }

  createBooking(booking: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookings/create`, booking, { responseType: 'text' }) as Observable<any>;
  }

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bookings/all`) as Observable<any>;
  }

  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers/all`) as Observable<any>;
  }

  getAllTravelPackages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tourist-packages/all`) as Observable<any>;
  }

  confirmBooking(bookingId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/bookings/confirm/${bookingId}`, null, { responseType: 'text' }) as Observable<any>;
  }
}
