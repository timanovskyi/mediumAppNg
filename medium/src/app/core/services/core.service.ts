import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { CurrentUserInputInterface } from '../../shared/types/currentUserInput.interface';

@Injectable()
export class CoreService {

  basePath = environment.apiUrl;

  constructor(private _http: HttpClient) {
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    return this._http.get<any>(`${this.basePath}/user`)
      .pipe(map(v => v.user))
  }

  updateCurrentUser(data: CurrentUserInputInterface): Observable<CurrentUserInterface> {
    return this._http.put<any>(`${this.basePath}/user`, data)
      .pipe(map(v => v.user))
  }
}
