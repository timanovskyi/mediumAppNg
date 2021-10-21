import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleInputInterface } from '../../shared/types/articleInput.interface';
import { ArticleInterface } from '../../shared/types/article.interface';
import { SaveArticleResponseInterface } from '../../shared/types/saveArticleResponse.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class CreateArticleService {

  constructor(private _http: HttpClient) {
  }

  createArticle(articleInput: ArticleInputInterface): Observable<ArticleInterface> {
    return this._http.post<SaveArticleResponseInterface>(`${environment.apiUrl}/articles`, {article: articleInput})
      .pipe(map((v) => v.article))
  }
}
