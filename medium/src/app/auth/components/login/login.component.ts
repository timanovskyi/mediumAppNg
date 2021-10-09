import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { select, Store } from '@ngrx/store';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { loginAction } from '../../store/actions/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  isSubmitting$: Observable<boolean> = new Observable<boolean>();
  backendErrors$: Observable<BackendErrorsInterface> = new Observable<BackendErrorsInterface>();

  constructor(private _fb: FormBuilder,
              private _store: Store,
  ) {
  }

  ngOnInit(): void {
    this._initializeForm();
    this._initializeValue();
  }

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this._store.dispatch(loginAction({request}));
  }

  private _initializeForm() {
    this.form = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  private _initializeValue() {
    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector))
    // @ts-ignore
    this.backendErrors$ = this._store.pipe(select(validationErrorsSelector))
  }

}
