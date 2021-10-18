import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable()
export class CoreService {

  basePath = environment.apiUrl;

  constructor(private _http: HttpClient) {
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    return this._http.get<any>(`${this.basePath}/user`)
      .pipe(map(v => v.user))
  }
}
