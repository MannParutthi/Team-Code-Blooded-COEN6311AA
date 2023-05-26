import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loginUser(userProfile: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/customers/login`, userProfile, { responseType: 'json' }) as Observable<any>;
  }
}
