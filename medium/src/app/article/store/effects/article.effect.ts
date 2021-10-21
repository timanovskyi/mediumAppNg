import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ArticleSharedService } from '../../../shared/services/articleShared.service';
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction,
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction
} from '../actions/article.actions';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';

@Injectable()
export class ArticleEffect {

  constructor(private actions$: Actions,
              private _service: ArticleService,
              private _router: Router,
              private _sharedService: ArticleSharedService) {
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
              return of(getArticleFailureAction({error: err}))
            })
          )
      })
    )
  )

  deleteArticle$ = createEffect(() => this.actions$.pipe(
      ofType(deleteArticleAction),
      switchMap(({slug}) => {
        return this._service.deleteArticle(slug)
          .pipe(
            map(() => {
              return deleteArticleSuccessAction()
            }),

            catchError((err) => {
              return of(deleteArticleFailureAction({error: err}))
            })
          )
      })
    )
  )

  redirectAfterDelete$ = createEffect(() => this.actions$.pipe(
      ofType(deleteArticleSuccessAction),
      tap(() => this._router.navigate(['/']))
    ),
    {dispatch: false}
  )
}
