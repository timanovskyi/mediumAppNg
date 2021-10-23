import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from '../actions/article.actions';
import { UserProfileService } from '../../services/user-profile.service';
import { UserProfileInterface } from '../../types/user-profile.interface';

@Injectable()
export class GetUserProfileEffect {

  constructor(private actions$: Actions,
              private _sharedService: UserProfileService,
  ) {
  }

  getUserProfile$ = createEffect(() => this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({slug}) => {
        return this._sharedService.getUserProfile(slug)
          .pipe(
            map((profile: UserProfileInterface) => {
              return getUserProfileSuccessAction({profile})
            }),
            catchError((err) => {
              return of(getUserProfileFailureAction({error: err.errors}))
            })
          )
      })
    )
  )
}
