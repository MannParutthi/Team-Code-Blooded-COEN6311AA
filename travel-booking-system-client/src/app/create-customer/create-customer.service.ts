import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateCustomerService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/customers/create`, customer, { responseType: 'text' }) as Observable<any>;
  }

  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers/all`) as Observable<any>;
  }
}
