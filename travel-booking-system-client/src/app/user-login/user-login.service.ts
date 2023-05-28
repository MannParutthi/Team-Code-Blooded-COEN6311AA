import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private baseUrl = "http://localhost:8081/api/v1";

  constructor(private http: HttpClient) { }

  loginUser(userProfile: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/customers/login`, userProfile, { responseType: 'json' }) as Observable<any>;
  }
}
