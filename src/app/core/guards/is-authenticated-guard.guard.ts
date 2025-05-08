import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AccessRightsService } from '../services/access-rights.service';
import { AppRoutes } from '../constants/app.routes';
import { UserProfileService } from '../services/user-profile.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
    const accessRightsService = inject(AccessRightsService);
    const profileService = inject(UserProfileService);
    const router = inject(Router);

    return accessRightsService.isAuthenticated().pipe(
        map(response => {
            if (response.status && response.data) {
                const userProfile: any = response?.data;
                profileService.setUserProfile(userProfile?.userName, userProfile?.emailAddress);
                return true;
            } else {
                return router.createUrlTree(['/', AppRoutes.ERROR, AppRoutes.ERROR_UNAUTHORIZED]);
            }
        }),
        catchError((error) => {
            console.log(error);
            return of(router.createUrlTree(['/', AppRoutes.ERROR, AppRoutes.ERROR_UNAUTHORIZED]));
        })
    );
};
