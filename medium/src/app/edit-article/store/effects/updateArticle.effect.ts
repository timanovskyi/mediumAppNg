import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from '../actions/article.actions';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { EditArticleService } from '../../services/edit-article.service';
import { Router } from '@angular/router';

@Injectable()
export class UpdateArticleEffect {

  constructor(private actions$: Actions,
              private _service: EditArticleService,
              private _router: Router
  ) {
  }

  updateArticle$ = createEffect(() => this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({slug, articleInput}) => {
        return this._service.updateArticle(slug, articleInput)
          .pipe(
            map((article: ArticleInterface) => {
              return updateArticleSuccessAction({article})
            }),

            catchError((err) => {
              console.log(err);
              return of(updateArticleFailureAction({error: err.error.errors}))
            })
          )
      })
    )
  )

  redirectAfterUpdate$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({article}) => this._router.navigate(['/articles', article.slug]))
      ),
    {dispatch: false}
  )
}
