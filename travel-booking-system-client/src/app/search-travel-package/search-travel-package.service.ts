import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTravelPackageService {

  private baseUrl = "http://localhost:8081/api/v1";

  constructor(private http: HttpClient) { }

  getAllPackagesByDestinationCity(destinationCity: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tourist-packages/search`, { params: { destinationCity}}) as Observable<any>;
  }

  getAllPackages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tourist-packages/all`) as Observable<any>;
  }

  getAllFlights(): Observable<any> {
    return this.http.get(`${this.baseUrl}/flights/all`) as Observable<any>;
  }

  getAllHotels(): Observable<any> {
    return this.http.get(`${this.baseUrl}/hotels/all`) as Observable<any>;
  }

  getAllActivities(): Observable<any> {
    return this.http.get(`${this.baseUrl}/activities/all`) as Observable<any>;
  }
}
