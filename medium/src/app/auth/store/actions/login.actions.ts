import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { LoginrRequestInterface } from '../../types/loginRequest.interface';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{request: LoginrRequestInterface}>()
)

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{errors: BackendErrorsInterface}>()
)

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)
