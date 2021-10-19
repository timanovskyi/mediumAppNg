import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PopularTagType } from '../../../types/popularTag.type';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class PopularTagsService {

  constructor(private _http: HttpClient) {
  }

  getPopularTags(): Observable<PopularTagType[]> {
    const url  = environment.apiUrl + '/tags';

    return this._http.get(url)
      .pipe(map((r: any) => r.tags))
  }
}
