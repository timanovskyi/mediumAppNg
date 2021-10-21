import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from '../actions/article.actions';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { ArticleSharedService } from '../../../shared/services/articleShared.service';

@Injectable()
export class GetArticleEffect {

  constructor(private actions$: Actions,
              private _sharedService: ArticleSharedService,
  ) {
  }

  getArticle$ = createEffect(() => this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({slug}) => {
        return this._sharedService.getArticle(slug)
          .pipe(
            map((article: ArticleInterface) => {
              return getArticleSuccessAction({article})
            }),
            catchError((err) => {
              return of(getArticleFailureAction())
            })
          )
      })
    )
  )
}
