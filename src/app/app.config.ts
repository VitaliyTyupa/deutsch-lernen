import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
} from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';
import {apiErrorsInterceptor} from './common-services/interceptors/api-errors.interceptor';
import {authHeaderInterceptor} from './common-services/interceptors/auth-header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([apiErrorsInterceptor, authHeaderInterceptor])
    ),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
    })
  ]
};
