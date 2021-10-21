import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ArticleService {

  constructor(private _http: HttpClient) {
  }

  deleteArticle(slug: string): Observable<any> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`
    return this._http.delete(fullUrl)
  }
}
