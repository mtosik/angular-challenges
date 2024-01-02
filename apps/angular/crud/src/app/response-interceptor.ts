import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class ResponseInterceptor<T> implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err.message);
        return throwError(() => new Error(err.message));
      }),
    );
  }
}
