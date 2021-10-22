import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { PersistanceService } from '../../../shared/services/persistance.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logoutAction } from '../actions/sync.actions';

@Injectable()
export class LogoutEffect {

  constructor(private actions$: Actions,
              private _localStorage: PersistanceService,
              private _router: Router,
              private _store: Store) {
  }

  logout$ = createEffect(() => this.actions$.pipe(
      ofType(logoutAction),
      tap(() => {
        this._localStorage.set('accessToken', '');
        this._router.navigate(['/'])

      })
    ),
    {dispatch: false}
  )
}
