import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ArticleInterface } from '../types/article.interface';
import { map } from 'rxjs/operators';
import { GetArticleResponseInterface } from '../types/getArticleResponse.interface';

@Injectable()
export class ArticleSharedService {


  constructor(private _http: HttpClient) {
  }

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`
    return this._http.get<GetArticleResponseInterface>(fullUrl)
      .pipe(map((r) => r.article))
  }
}
