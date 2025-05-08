import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiResponse } from '../../../../core/interface/ApiResponse';
import { VerifyOtpRequest } from '../../../../core/models/verifyotp-request.model';
import { LoginRequest } from '../../../../core/models/login-request.model';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppRoutes } from '../../../../core/constants/app.routes';
import { matchOtherValidator } from '../../../../shared/validators/passwordMatchValidator';
import { EmailResetRequestModel } from '../../../../core/models/reset-request.model';
import { PasswordResetOTPVerify } from '../../../../core/models/password-reset-verify.model';

@Component({
    selector: 'app-forgot-password',
    // imports: [],
    standalone: false,
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

    appRoutes = AppRoutes;

    ResetForm: FormGroup = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        mobileNo: new FormControl('', [
            Validators.required,
            Validators.pattern(/^\+?[1-9]\d{1,14}$/)
        ]),
        newPassword: new FormControl({ value: '', disabled: true }, [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
        ]),
        confirmPassword: new FormControl({ value: '', disabled: true }, [
            Validators.required,
            matchOtherValidator("newPassword")
        ]),
        token: new FormControl({ value: '', disabled: true }, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6)
        ])
    });

    formSubmitted = false;
    isError = false;
    errorMessage = '';
    showResetRequestSuccessModel = false;
    showResetSuccessModel = false;
    isPasswordResetRequestSuccess = false;
    isPasswordResetSuccess = false;

    constructor(
        private router: Router,
        private location: Location,
        private authService: AuthService
    ) { }

    navigateToLogin(): void {
        this.router.navigate(['/', this.appRoutes.AUTH, this.appRoutes.LOGIN]);
    }

    navigateToForgotPassword(): void {
        this.router.navigate(['/', this.appRoutes.AUTH, this.appRoutes.FORGOT_PASSWORD]);
    }

    onSubmit(): void {
        this.formSubmitted = true;
        if (this.ResetForm.invalid) return;

        const resetRequestData = this.ResetForm.value as EmailResetRequestModel;
        this.isError = false;
        resetRequestData.email = resetRequestData.email.trim();
        console.log(resetRequestData)

        this.authService.RequestPasswordReset(resetRequestData).subscribe({
            next: () => {
                this.showResetRequestSuccessModel = true;
                this.formSubmitted = false;
            },
            error: (err) => this.handleError(err)
        });
    }

    onOtpVerificationSubmit(): void {
        this.formSubmitted = true;
        if (this.ResetForm.invalid) return;

        this.isError = false;
        const otpData = this.ResetForm.getRawValue() as PasswordResetOTPVerify;

        this.authService.RequestPasswordVerification(otpData).subscribe({
            next: () => {
                this.showResetSuccessModel = true;
                this.formSubmitted = false;
            },
            error: (err) => this.handleError(err)
        });
    }

    private handleError(err: any): void {
        this.isError = true;
        const errorResponse: ApiResponse<string> = err.error;
        console.log(errorResponse);
        this.errorMessage = errorResponse?.errors?.[0] || 'Reset Password Failed.';
    }

    disableResetFields(): void {
        ['email', 'mobileNo'].forEach(control => {
            this.ResetForm.get(control)?.disable();
        });
        this.ResetForm.get('token')?.enable();
        this.ResetForm.get("newPassword")?.enable();
        this.ResetForm.get("confirmPassword")?.enable();
    }

    resetRequestSuccessModalClose(): void {
        this.showResetRequestSuccessModel = false;
        this.isPasswordResetRequestSuccess = true;
        this.disableResetFields();
    }

    passwordResetSuccessModalClose(): void {
        this.showResetSuccessModel = false;
        this.ResetForm.reset();
        this.isPasswordResetRequestSuccess = false;
    }

    goBack(): void {
        this.location.back();
    }

    get f() {
        return this.ResetForm.controls;
    }
}
