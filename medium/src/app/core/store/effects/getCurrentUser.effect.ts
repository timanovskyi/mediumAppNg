import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CoreService } from '../../services/core.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { of } from 'rxjs';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from '../actions/getCurrentUser.actions';
import { PersistanceService } from '../../../shared/services/persistance.service';
import { Store } from '@ngrx/store';
import { loginSuccessAction } from '../../../auth/store/actions/login.actions';

@Injectable()
export class GetCurrentUserEffect {

  constructor(private actions$: Actions,
              private _store: Store,
              private _localStorage: PersistanceService,
              private _service: CoreService) {
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
              this._store.dispatch(loginSuccessAction())
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
