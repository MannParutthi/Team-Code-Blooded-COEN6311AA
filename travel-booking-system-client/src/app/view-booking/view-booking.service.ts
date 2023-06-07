import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewBookingService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bookings/all`) as Observable<any>;
  }

  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers/all`) as Observable<any>;
  }

  getAllTravelPackages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tourist-packages/all`) as Observable<any>;
  }

}
