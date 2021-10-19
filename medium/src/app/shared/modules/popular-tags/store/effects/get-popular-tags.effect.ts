import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction
} from '../actions/get-popular-tags.actions';
import { PopularTagsService } from '../../services/popular-tags.service';
import { PopularTagType } from '../../../../types/popularTag.type';

@Injectable()
export class GetPopularTagsEffect {

  constructor(private actions$: Actions,
              private _service: PopularTagsService) {
  }

  getTags$ = createEffect(() => this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this._service.getPopularTags()
          .pipe(
            map((tags: PopularTagType[]) => {
              return getPopularTagsSuccessAction({tags})
            }),

            catchError((err) => {
              return of(getPopularTagsFailureAction({error: err}))
            })
          )
      })
    )
  )
}
