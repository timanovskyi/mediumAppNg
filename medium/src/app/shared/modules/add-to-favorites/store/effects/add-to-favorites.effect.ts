import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AddToFavoritesService } from '../../services/addToFavorites.service';
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction
} from '../actions/add-to-favorites.actions';
import { ArticleInterface } from '../../../../types/article.interface';

@Injectable()
export class AddToFavoritesEffect {

  constructor(private actions$: Actions,
              private _service: AddToFavoritesService) {
  }

  favorites$ = createEffect(() => this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({isFavorited, slug}) => {
        const actions$ = isFavorited ? this._service.removeToFavorites(slug) : this._service.addToFavorites(slug);
        return actions$
          .pipe(
            map((article: ArticleInterface) => {
              return addToFavoritesSuccessAction({article})
            }),

            catchError((err) => {
              return of(addToFavoritesFailureAction({error: err}))
            })
          )
      })
    )
  )
}
