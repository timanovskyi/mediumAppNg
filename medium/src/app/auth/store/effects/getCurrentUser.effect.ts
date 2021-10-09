import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { of } from 'rxjs';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from '../actions/getCurrentUser.actions';
import { PersistanceService } from '../../../shared/services/persistance.service';

@Injectable()
export class GetCurrentUserEffect {

  constructor(private actions$: Actions,
              private _localStorage: PersistanceService,
              private _service: AuthService) {
  }

  getCurrentUser$ = createEffect(() => this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(({}) => {
        const token = this._localStorage.get('accessToken');
        if (!token) {
          return of(getCurrentUserFailureAction())
        }
        return this._service.getCurrentUser()
          .pipe(
            map((currentUser: CurrentUserInterface) => {
              return getCurrentUserSuccessAction({currentUser})
            }),

            catchError(() => {
              return of(getCurrentUserFailureAction())
            })
          )
      })
    )
  )
}
