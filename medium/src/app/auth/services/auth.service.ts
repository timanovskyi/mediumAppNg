import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  basePath = environment.apiUrl;

  constructor(private _http: HttpClient) {
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this._http.post<AuthResponseInterface>(`${this.basePath}/users`, data)
      .pipe(map((r: AuthResponseInterface) => r.user))
  }
}
