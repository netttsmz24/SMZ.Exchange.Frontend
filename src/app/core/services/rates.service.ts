import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { ApiResponse } from '../interface/ApiResponse';
import { ExchangeRate } from '../interface/ExchangeRate';
import { CashExchangeRate } from '../interface/CashExchangeRate';
import { RemittanceRate } from '../interface/RemittanceRate';
import { TravelCardRate } from '../interface/TravelCardRate';

@Injectable({
    providedIn: 'root',
})

export class RatesService {

    private apiUrl = environment.bookingUrl + "/Rates";  // Replace with your actual API URL

    constructor(private http: HttpClient) { }

    public getExchangeRates(skipSpinner: boolean = false): Observable<ApiResponse<ExchangeRate>> {
        return this.http.get<ApiResponse<ExchangeRate>>(this.apiUrl + "/All", {
            headers: new HttpHeaders({
                'X-Skip-Spinner': `${skipSpinner}`
            })
        });
    }

    public getCashExchangeRates(): Observable<ApiResponse<CashExchangeRate[]>> {
        return this.http.get<ApiResponse<CashExchangeRate[]>>(this.apiUrl + "/CashExchangeRates");
    }

    public getRemittanceRates(): Observable<ApiResponse<RemittanceRate[]>> {
        return this.http.get<ApiResponse<RemittanceRate[]>>(this.apiUrl + "/RemittanceRates");
    }

    public getTravelCardRates(): Observable<ApiResponse<TravelCardRate[]>> {
        return this.http.get<ApiResponse<TravelCardRate[]>>(this.apiUrl + "/TravelCardRates");
    }

}