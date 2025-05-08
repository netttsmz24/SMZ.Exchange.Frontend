import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppRoutes } from '../constants/app.routes';

@Injectable({
    providedIn: 'root'
})
export class AppNavigationService {

    constructor(
        private location: Location,
        private router: Router
    ) { }

    goBack(): void {
        this.location.back();
    }

    goForward(): void {
        this.location.forward();
    }

    navigateHome(): void {
        this.router.navigate(['/', AppRoutes.APP_HOME])
    }

    navigateToAdminHome(): void {
        this.router.navigate(["/", AppRoutes.ADMIN, AppRoutes.ADMIN_DASHBOARD])
    }

    navigateClientDashboard(): void {
        this.router.navigate(['/', AppRoutes.USER_BASEROUTE, AppRoutes.USER_DASHBOARD])
    }
}
