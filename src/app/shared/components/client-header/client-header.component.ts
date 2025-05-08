import { Component, OnInit } from '@angular/core';
import { AppNavigationService } from '../../../core/services/app-navigation.service';
import { UserProfileModel } from '../../../core/models/user-profile.model';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { CommonModule } from '@angular/common';
import { AppRoutes } from '../../../core/constants/app.routes';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
    selector: 'app-client-header',
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './client-header.component.html',
    styleUrl: './client-header.component.css'
})

export class ClientHeaderComponent implements OnInit {


    userProfile: UserProfileModel = new UserProfileModel();
    appRoutes = AppRoutes;

    constructor(
        public navigationService: AppNavigationService,
        public userProfileService: UserProfileService,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.userProfileService.getUserProfile$().subscribe(profile => {
            if (profile) {
                this.userProfile = profile;
            }
        })
    }

    logout(): void {
        const permistion = window.confirm("Are you sure you want to log out?")
        if (permistion) {
            this.authService.logOut();
        }
    }
}
