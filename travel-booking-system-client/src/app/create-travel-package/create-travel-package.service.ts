import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreateTravelPackageService {

  private baseUrl = "http://localhost:8081/api/v1";

  constructor(private http: HttpClient) { }

  createPackage(touristpackage: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tourist-packages/create`, touristpackage, { responseType: 'text' }) as Observable<any>;
  }
}
