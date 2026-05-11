import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {catchError, throwError} from 'rxjs';

export const apiErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((error) => {
      let errorMessage = $localize`:@@apiUnknownError:An unknown error occurred!`;
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = $localize`:@@apiClientError:Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 400:
            errorMessage = $localize`:@@apiBadRequestError:Bad Request. ${error.message}`;
            break;
          case 401:
            errorMessage = $localize`:@@apiUnauthorizedError:Unauthorized. ${error.message}`;
            break;
          case 403:
            errorMessage = $localize`:@@apiForbiddenError:Forbidden. ${error.message}`;
            break;
          case 404:
            errorMessage = $localize`:@@apiNotFoundError:Not Found. ${error.message}`;
            break;
          case 500:
            errorMessage = $localize`:@@apiInternalServerError:Internal Server Error. ${error.message}`;
            break;
          default:
            errorMessage = $localize`:@@apiGenericError:Error Code: ${error.status}:INTERPOLATION:\nMessage: ${error.message}:INTERPOLATION_1:`;
        }
      }
      toastr.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
