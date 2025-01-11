import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideQuillConfig} from 'ngx-quill';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'underline'],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'background': [
              '#ffdf80'
            ] }],
          ['image']
        ]
      },
      formats: ['font', 'bold', 'underline', 'size', 'background', 'image'],
      placeholder: 'Beginnen Sie hier mit der Eingabe ...'
    })
  ]
};
