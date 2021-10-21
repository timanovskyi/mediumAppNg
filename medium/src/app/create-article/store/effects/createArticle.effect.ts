import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from '../actions/article.actions';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { CreateArticleService } from '../../services/create-article.service';
import { Router } from '@angular/router';

@Injectable()
export class CreateArticleEffect {

  constructor(private actions$: Actions,
              private _service: CreateArticleService,
              private _router: Router
  ) {
  }

  createArticle$ = createEffect(() => this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({articleInput}) => {
        return this._service.createArticle(articleInput)
          .pipe(
            map((article: ArticleInterface) => {
              return createArticleSuccessAction({article})
            }),

            catchError((err) => {
              console.log(err);
              return of(createArticleFailureAction({error: err.error.errors}))
            })
          )
      })
    )
  )

  redirectAfterCreate$ = createEffect(() =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({article}) => this._router.navigate(['/articles', article.slug]))
      ),
    {dispatch: false}
  )

}
