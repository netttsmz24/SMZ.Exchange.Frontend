import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../../../core/models/login-request.model';
import { VerifyOtpRequest } from '../../../../core/models/verifyotp-request.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiResponse } from '../../../../core/interface/ApiResponse';
import { AppRoutes } from '../../../../core/constants/app.routes';

@Component({
	selector: 'app-login',
	// imports: [],
	standalone: false,
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})

export class LoginComponent {

	@ViewChild('otpInput') otpInput!: ElementRef;
	appRoutes = AppRoutes;

	loginForm: FormGroup = new FormGroup({
		username: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
			Validators.pattern(/^[a-zA-Z0-9._@]+$/)
		]),
		email: new FormControl('', [
			Validators.required,
			Validators.email
		]),
		mobileNo: new FormControl('', [
			Validators.required,
			Validators.pattern(/^\+?[1-9]\d{1,14}$/)
		]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(6),
			Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
		]),
		otp: new FormControl({ value: '', disabled: true }, [
			Validators.required,
			Validators.minLength(6),
			Validators.maxLength(6)
		])
	});

	formSubmitted = false;
	isError = false;
	errorMessage = '';
	showLoginSuccessModel = false;
	isLoginSuccess = false;

	constructor(
		private router: Router,
		private location: Location,
		private authService: AuthService
	) { }

	navigateToRegister(): void {
		this.router.navigate(['/', this.appRoutes.AUTH, this.appRoutes.REGISTER]);
	}

	navigateToForgotPassword(): void {
		this.router.navigate(['/', this.appRoutes.AUTH, this.appRoutes.FORGOT_PASSWORD]);
	}

	onSubmit(): void {
		this.formSubmitted = true;
		if (this.loginForm.invalid) return;

		const loginData = this.loginForm.value as LoginRequest;
		this.isError = false;

		loginData.username = loginData.username.trim();
		loginData.email = loginData.email.trim();

		this.authService.initiateLogin(loginData).subscribe({
			next: () => {
				this.showLoginSuccessModel = true;
				this.isLoginSuccess = true;
				this.disableLoginFields();
				this.formSubmitted = false;
			},
			error: (err) => this.handleError(err)
		});
	}

	onOtpVerificationSubmit(): void {
		this.formSubmitted = true;
		if (this.loginForm.invalid) return;

		this.isError = false;
		const otpData = this.loginForm.getRawValue() as VerifyOtpRequest;

		this.authService.VerifyLoginOtp(otpData).subscribe({
			next: (response) => {
				this.authService.setAuthToken(response.data);
				this.router.navigate(['/', this.appRoutes.USER_BASEROUTE, this.appRoutes.USER_DASHBOARD]);
			},
			error: (err) => this.handleError(err)
		});
	}

	private handleError(err: any): void {
		this.isError = true;
		const errorResponse: ApiResponse<string> = err.error;
		this.errorMessage = errorResponse?.errors?.[0] || 'Login failed.';
	}

	disableLoginFields(): void {
		['userName', 'email', 'password', 'mobileNo'].forEach(control => {
			this.loginForm.get(control)?.disable();
		});
		this.loginForm.get('otp')?.enable();
	}

	loginSuccessModalClose(): void {
		this.showLoginSuccessModel = false;
		this.otpInput.nativeElement.focus();
	}

	goBack(): void {
		this.location.back();
	}

	get f() {
		return this.loginForm.controls;
	}
}
