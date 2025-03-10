import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {catchError, throwError} from 'rxjs';

export const apiErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 400:
            errorMessage = `Bad Request. ${error.message}`;
            break;
          case 401:
            errorMessage = `Unauthorized. ${error.message}`;
            break;
          case 403:
            errorMessage = `Forbidden. ${error.message}`;
            break;
          case 404:
            errorMessage = `Not Found. ${error.message}`;
            break;
          case 500:
            errorMessage = `Internal Server Error. ${error.message}`;
            break;
          default:
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }
      toastr.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
