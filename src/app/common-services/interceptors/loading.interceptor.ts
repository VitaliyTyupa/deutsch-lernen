import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { EventService } from '../event.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const eventService = inject(EventService);

  eventService.isLoading$.set(true);

  return next(req).pipe(
    finalize(() => eventService.isLoading$.set(false))
  );
};
