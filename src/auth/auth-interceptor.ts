import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { StorageProvider } from '../providers/storage/storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthServiceProvider, public storage: StorageProvider) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('x-access-token')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('x-access-token') || null
        }
      });
    }

    return next.handle(request);

  }
}
