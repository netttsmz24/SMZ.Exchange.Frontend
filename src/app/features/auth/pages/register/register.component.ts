import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppRoutes } from '../../../../core/constants/app.routes';
import { RegisterRequest } from '../../../../core/models/register.request.model';
import { ApiResponse } from '../../../../core/interface/ApiResponse';
import { matchOtherValidator } from '../../../../shared/validators/passwordMatchValidator';
import { StaticDataService } from '../../../../core/services/static-data.service';
import { CountryListModel, PublicStaticDataModel } from '../../../../core/models/public-staticdata.model';

@Component({
    selector: 'app-register',
    // imports: [],
    standalone: false,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

    appRoutes = AppRoutes;
    public CountryList!: CountryListModel[];

    registerForm: FormGroup = new FormGroup({
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
        confirmPassword: new FormControl('', [
            Validators.required,
            matchOtherValidator("password")
        ]),
        nationality: new FormControl('', [
            Validators.required,
        ]),
    });

    formSubmitted = false;
    isError = false;
    errorMessage = '';
    showSuccessModel = false;

    constructor(
        private location: Location,
        private router: Router,
        private authService: AuthService,
        private staticDataService: StaticDataService
    ) { }

    ngOnInit(): void {
        this.staticDataService.getPublicStaticDataRequest().subscribe({
            next: (response) => {
                this.CountryList = response.data.countryList;
                console.log(this.CountryList);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    onSubmit(): void {
        this.formSubmitted = true;
        if (this.registerForm.invalid) return;

        const userData = this.registerForm.value as RegisterRequest;
        this.isError = false;
        userData.username = userData.username.trim();
        userData.email = userData.email.trim();

        this.authService.createNewAccount(userData).subscribe({
            next: (response) => {
                this.showSuccessModel = true;
                this.formSubmitted = false;
            },
            error: (err) => this.handleError(err)
        });
    }

    private handleError(err: any): void {
        this.isError = true;
        const errorResponse: ApiResponse<string> = err.error;
        this.errorMessage = errorResponse?.errors?.[0] || 'Registration failed. Please try again.';
    }

    loginSuccessModalClose(): void {
        this.showSuccessModel = false;
        this.registerForm.reset();
    }

    goBack() {
        this.location.back();
    }

    navigateToLogin(): void {
        this.router.navigate(['/', AppRoutes.AUTH, AppRoutes.LOGIN]);
    }

    get f() {
        return this.registerForm.controls;
    }

}
