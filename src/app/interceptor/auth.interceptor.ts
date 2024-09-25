import { StorageService } from './../services/storage.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
// import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private auth: AuthService,
    private storage: StorageService,
    // private loaderService : LoaderService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentClient = this.storage.getItem('currentClient');
    if (currentClient) {
      request = request.clone({
        setHeaders: {
          Authorization: `Jwt ${currentClient}`,
    
        },
      });
      if (!request.url.includes(currentClient)) {
        request = request.clone({
          url: request.url + '?access_token=' + currentClient,
        });
      }
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('events...' + event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse | any) => {
        // @ts-ignore
        const data = {
          reason: error && error.error?.reason ? error.error?.reason : '',
          status: error?.status,
          causedBy: error.error?.error_description,
          msg: error.error?.errors
            ? error.error.errors[0].extensions.code
            : null,
        };

        // this.auth.collectFailedRequest(data);

        return EMPTY;
      })
    );
    // this.loaderService.showLoader();
    // return next.handle(request).pipe(
    //   finalize(() => this.loaderService.hideLoader())
    // );
  }
  
}