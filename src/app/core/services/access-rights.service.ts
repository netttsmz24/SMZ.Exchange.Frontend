import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { ApiResponse } from '../interface/ApiResponse';
import { UserProfileModel } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AccessRightsService {

  authApiUrl: string = environment.authUrl + "/access-rights"

  constructor(public http: HttpClient) { }

  isAuthenticated(): Observable<ApiResponse<any>> {
    // token header is automatically set in http interceptor
    return this.http.get<ApiResponse<any>>(this.authApiUrl + "/is-authenticated")
  }

}
