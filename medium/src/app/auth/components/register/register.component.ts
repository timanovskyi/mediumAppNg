import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { registerAction } from '../../store/actions/register.actions';
import { Observable } from 'rxjs';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  isSubmitting$: Observable<boolean> = new Observable<boolean>();
  backendErrors$: Observable<BackendErrorsInterface | null> = new Observable<{} | null>();

  constructor(private _fb: FormBuilder,
              private _store: Store,
  ) {
  }

  get isSubmitted(): boolean {
    return this.form.valid
  }

  ngOnInit(): void {
    this._initializeForm();
    this._initializeValue();
  }

  onSubmit() {
    // if (!this.isSubmitted) {
    //   return
    // }
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this._store.dispatch(registerAction({request}));
  }

  private _initializeForm() {
    this.form = this._fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  private _initializeValue() {
    // @ts-ignore
    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector))
    // @ts-ignore
    this.backendErrors$ = this._store.pipe(select(validationErrorsSelector))
  }
}
