import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  updateProfile(userId: any, userProfile: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/customers/update/${userId}`, userProfile, { responseType: 'text' }) as Observable<any>;
  }
}