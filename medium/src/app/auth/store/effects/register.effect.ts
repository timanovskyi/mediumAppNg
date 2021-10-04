import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { registerAction, registerFailureAction, registerSuccessAction } from '../actions/register.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { of } from 'rxjs';
import { PersistanceService } from '../../../shared/services/persistance.service';
import { Router } from '@angular/router';

@Injectable()
export class RegisterEffect {

  constructor(private actions$: Actions,
              private _localStorage: PersistanceService,
              private _router: Router,
              private _service: AuthService) {
  }

  register$ = createEffect(() => this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this._service.register(request)
          .pipe(
            map((currentUser: CurrentUserInterface) => {
              this._localStorage.set('accessToken', currentUser.token);
              return registerSuccessAction({currentUser})
            }),

            catchError((err) => {
              return of(registerFailureAction({errors: err.error.errors}))
            })
          )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(() =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this._router.navigate(['../'])
        })
      ),
    {dispatch: false}
  )
}
