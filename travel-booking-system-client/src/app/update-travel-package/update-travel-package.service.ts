import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UpdateTravelPackageService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  updatePackage(packageId: any, touristpackage: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tourist-packages/update/${packageId}`, touristpackage, { responseType: 'text' }) as Observable<any>;
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
