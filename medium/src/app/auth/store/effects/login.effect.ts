import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/login.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { of } from 'rxjs';
import { PersistanceService } from '../../../shared/services/persistance.service';
import { Router } from '@angular/router';
import { updateStateOfCurrentUserAction } from '../../../core/store/actions/getCurrentUser.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class LoginEffect {

  constructor(private actions$: Actions,
              private _localStorage: PersistanceService,
              private _router: Router,
              private _store: Store,
              private _service: AuthService) {
  }

  login$ = createEffect(() => this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this._service.login(request)
          .pipe(
            map((currentUser: CurrentUserInterface) => {
              this._localStorage.set('accessToken', currentUser.token);
              this._store.dispatch(updateStateOfCurrentUserAction({currentUser}))
              return loginSuccessAction()
            }),

            catchError((err) => {
              return of(loginFailureAction({errors: err.error.errors}))
            })
          )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => this._router.navigate(['../']))
      ),
    {dispatch: false}
  )
}
