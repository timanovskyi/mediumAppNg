import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  basePath = environment.apiUrl;

  constructor(private _http: HttpClient) {
  }

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = this.basePath + url;
    return this._http.get<GetFeedResponseInterface>(fullUrl)
  }
}
