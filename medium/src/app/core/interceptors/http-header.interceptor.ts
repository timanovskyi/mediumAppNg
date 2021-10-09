import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistanceService } from '../../shared/services/persistance.service';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

  constructor(private _localStorage: PersistanceService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._localStorage.get('accessToken');
    if (token) {
      return next.handle(request.clone(
        {
          setHeaders: {
            Authorization: `Token ${token}`
          }
        }
      ))
    }
    return next.handle(request);
  }
}
