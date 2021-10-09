import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { map } from 'rxjs/operators';
import { LoginrRequestInterface } from '../types/loginRequest.interface';

@Injectable()
export class AuthService {

  basePath = environment.apiUrl;

  constructor(private _http: HttpClient) {
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this._http.post<AuthResponseInterface>(`${this.basePath}/users`, data)
      .pipe(map(this._getUser))
  }

  login(data: LoginrRequestInterface): Observable<CurrentUserInterface> {
    return this._http.post<AuthResponseInterface>(`${this.basePath}/users/login`, data)
      .pipe(map(this._getUser))
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    return this._http.get<AuthResponseInterface>(`${this.basePath}/user`)
      .pipe(map(this._getUser))
  }

  private _getUser(data: AuthResponseInterface): CurrentUserInterface {
    return data.user
  }
}
