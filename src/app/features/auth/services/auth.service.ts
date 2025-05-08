import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../core/interface/ApiResponse';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../../core/models/login-request.model';
import { VerifyOtpRequest } from '../../../core/models/verifyotp-request.model';
import { RegisterRequest } from '../../../core/models/register.request.model';
import { EmailResetRequestModel } from '../../../core/models/reset-request.model';
import { PasswordResetOTPVerify } from '../../../core/models/password-reset-verify.model';
import { AppNavigationService } from '../../../core/services/app-navigation.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private apiUrl: string = environment.authUrl + "/auth";
    private tokenName: string = "access_token";
    constructor(
        private http: HttpClient,
        public navigationService: AppNavigationService,
    ) { }

    public createNewAccount(newUser: RegisterRequest): Observable<ApiResponse<string>> {
        return this.http.post<ApiResponse<string>>(this.apiUrl + "/register", newUser);
    }

    public initiateLogin(user: LoginRequest): Observable<ApiResponse<string>> {
        return this.http.post<ApiResponse<string>>(this.apiUrl + "/login", user);
    }

    public VerifyLoginOtp(user: VerifyOtpRequest): Observable<ApiResponse<string>> {
        return this.http.post<ApiResponse<string>>(this.apiUrl + "/verify-otp", user)
    }

    public RequestPasswordReset(user: EmailResetRequestModel): Observable<ApiResponse<string>> {
        return this.http.post<ApiResponse<string>>(this.apiUrl + "/request-password-reset", user)
    }

    public RequestPasswordVerification(user: PasswordResetOTPVerify): Observable<ApiResponse<string>> {
        return this.http.post<ApiResponse<string>>(this.apiUrl + "/reset-password", user)
    }

    public getAuthToken(): string {
        return sessionStorage.getItem(this.tokenName) || ""
    }

    public setAuthToken(token: string) {
        return sessionStorage.setItem(this.tokenName, token);
    }

    public clearAuthToken() {
        sessionStorage.removeItem(this.tokenName);
    }

    public logOut(): void {
        this.http.post<ApiResponse<string>>(this.apiUrl + "/logout", {}).subscribe({
            next: () => {
                this.clearAuthToken();
                this.navigationService.navigateHome();
            },
            error: (err) => {
                console.error('Logout failed:', err);
                this.clearAuthToken();
                this.navigationService.navigateHome();
            }
        })
    }
}
