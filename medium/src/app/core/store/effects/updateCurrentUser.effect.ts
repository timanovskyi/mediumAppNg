import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CoreService } from '../../services/core.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { of } from 'rxjs';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from '../actions/updateCurrentUser.actions';

@Injectable()
export class UpdateCurrentUserEffect {

  constructor(private actions$: Actions,
              private _service: CoreService) {
  }

  updateCurrentUser$ = createEffect(() => this.actions$.pipe(
      ofType(updateCurrentUserAction),
      switchMap(({currentUserInput}) => {
        return this._service.updateCurrentUser(currentUserInput)
          .pipe(
            map((currentUser: CurrentUserInterface) => {
              return updateCurrentUserSuccessAction({currentUser})
            }),

            catchError((e) => {
              console.log(e);
              return of(updateCurrentUserFailureAction({errors: e.error.errors}))
            })
          )
      })
    )
  )
}
