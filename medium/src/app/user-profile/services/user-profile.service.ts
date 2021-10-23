import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserProfileResponseInterface } from '../types/user-profile-response.interface';
import { UserProfileInterface } from '../types/user-profile.interface';

@Injectable()
export class UserProfileService {

  constructor(private _http: HttpClient) {
  }

  getUserProfile(slug: string): Observable<UserProfileInterface> {
    return this._http.get<UserProfileResponseInterface>(`${environment.apiUrl}/profiles/${slug}`)
      .pipe(map((v) => v.profile))
  }
}
