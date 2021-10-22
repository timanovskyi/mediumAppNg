import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { currentUserSelector } from '../../../core/store/selectors';
import { filter } from 'rxjs/operators';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { errorsSelector, isSubmittingSelector } from '../../store/selectors';
import { CurrentUserInputInterface } from '../../../shared/types/currentUserInput.interface';
import { updateCurrentUserAction } from '../../../core/store/actions/updateCurrentUser.actions';
import { logoutAction } from '../../../core/store/actions/sync.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isSubmitting$: Observable<boolean> = new Observable<boolean>();
  backendErrors$: Observable<BackendErrorsInterface> = new Observable<BackendErrorsInterface>();
  currentUser: CurrentUserInterface;

  private _subs: Subscription = new Subscription();

  constructor(private _fb: FormBuilder,
              private _store: Store) {
  }

  ngOnInit(): void {
    this._initValues();

  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  private _initForm() {
    this.form = this._fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',

    })
  }

  private _initValues() {
    this._subs.add(
      this._store.pipe(
        select(currentUserSelector),
        filter(Boolean)
      ).subscribe((v: CurrentUserInterface) => {
          this.currentUser = v;
          this._initForm();
        }
      )
    )

    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this._store.pipe(select(errorsSelector))
  }

  onSubmit() {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value
    }
    this._store.dispatch(updateCurrentUserAction({currentUserInput}))
  }

  logOut() {
    this._store.dispatch(logoutAction())
  }
}
