import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleInputInterface } from '../../shared/types/articleInput.interface';
import { ArticleInterface } from '../../shared/types/article.interface';
import { SaveArticleResponseInterface } from '../../shared/types/saveArticleResponse.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class EditArticleService {

  constructor(private _http: HttpClient) {
  }

  updateArticle(slug: string, articleInput: ArticleInputInterface): Observable<ArticleInterface> {
    return this._http.put<SaveArticleResponseInterface>(`${environment.apiUrl}/articles/${slug}`, {article: articleInput})
      .pipe(map((v) => v.article))
  }
}
