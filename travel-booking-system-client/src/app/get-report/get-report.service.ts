import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetReportService {
  private baseUrl = "http://localhost:8081/api/v1";

  constructor(private http: HttpClient) { }

  getReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/travel-bookings/report`) as Observable<any>;
  }
}
