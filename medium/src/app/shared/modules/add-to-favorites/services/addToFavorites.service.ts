import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ArticleInterface } from '../../../types/article.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class AddToFavoritesService {

  basePath = environment.apiUrl;

  constructor(private _http: HttpClient) {
  }

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${this.basePath}/articles/${slug}/favorite`;
    return this._http.post<any>(fullUrl, {}).pipe(map((v) => v.article))
  }

  removeToFavorites(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${this.basePath}/articles/${slug}/favorite`;
    return this._http.delete<any>(fullUrl).pipe(map((v) => v.article))
  }
}
