import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { AuthController } from 'src/app/core/Controllers';
import { ApiResponse } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
    ) {
  }

  getUserByToken(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${AuthController.GetUserByToken}${ this.cookieService.get("userToken")}`);
  }

  updateProfile(payload: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(AuthController.UpdateProfile, payload);
  }

  changePassword(payload: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(AuthController.UpdatePassword, payload);
  }
  
}
