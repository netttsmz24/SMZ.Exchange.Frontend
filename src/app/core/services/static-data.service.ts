import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { PublicStaticDataModel } from '../models/public-staticdata.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  private baseUrl: string = environment.bookingUrl || "";
  constructor(private httpClient: HttpClient) { }

  getPublicStaticDataRequest(): Observable<ApiResponse<PublicStaticDataModel>> {
    return this.httpClient.get<ApiResponse<PublicStaticDataModel>>(`${this.baseUrl}/StaticData/public`);
  }
  getSecureStaticDataRequest(): Observable<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>>(`${this.baseUrl}/StaticData/secure`);
  }
}
