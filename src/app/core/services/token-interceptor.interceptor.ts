import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getAuthToken();

    let headers = req.headers.set('Content-Type', 'application/json');

    if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const newReq = req.clone({ headers });
    return next(newReq);
};
