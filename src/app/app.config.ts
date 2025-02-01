import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideQuillConfig} from 'ngx-quill';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';
import {apiErrorsInterceptor} from './common-services/interceptors/api-errors.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([apiErrorsInterceptor])
    ),
    // provideQuillConfig({
    //   modules: {
    //     toolbar: [
    //       ['bold', 'underline'],
    //       [{ 'size': ['small', false, 'large', 'huge'] }],
    //       [{ 'background': [
    //           '#ffdf80'
    //         ] }],
    //       ['image']
    //     ]
    //   },
    //   formats: ['font', 'bold', 'underline', 'size', 'background', 'image'],
    //   placeholder: 'Beginnen Sie hier mit der Eingabe ...'
    // }),
    provideQuillConfig({
      modules: {
        toolbar: false,
      },
      placeholder: 'Beginnen Sie hier mit der Eingabe ...'
    }),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
    })
  ]
};
