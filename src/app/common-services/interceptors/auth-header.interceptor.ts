import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {SessionService} from '../session.service';

export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService);
  const token = sessionService.token;
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  return next(req);
}
