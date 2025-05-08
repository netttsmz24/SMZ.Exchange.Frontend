import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptorInterceptor } from './core/services/token-interceptor.interceptor';
import { spinnerInterceptorInterceptor } from './core/services/spinner-interceptor.interceptor';
import { httpErrorInterceptorInterceptor } from './core/services/http-error-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(
      withInterceptors([
        spinnerInterceptorInterceptor,
        tokenInterceptorInterceptor,
        httpErrorInterceptorInterceptor
      ])
    )
  ]
};
