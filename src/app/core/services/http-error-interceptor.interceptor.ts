import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { AppRoutes } from '../constants/app.routes';

export const httpErrorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    return next(req).pipe(
        catchError((error) => {
            const status = error.status;
            if (status === 0) {
                router.navigate(['/', AppRoutes.ERROR, AppRoutes.ERROR_SERVICE_UNAVAILABLE])
            }
            return throwError(() => error)
        })
    );
};
