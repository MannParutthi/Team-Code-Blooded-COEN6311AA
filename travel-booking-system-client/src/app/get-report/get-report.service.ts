import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GetReportService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/travel-bookings/report`) as Observable<any>;
  }
}
