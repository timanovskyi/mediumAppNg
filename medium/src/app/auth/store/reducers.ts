import { AuthStateInterface } from '../types/authState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { registerAction, registerFailureAction, registerSuccessAction } from './actions/register.actions';
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.actions';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from './actions/getCurrentUser.actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  isLoading: true,
  validationErrors: null
}

const authReducer = createReducer(
  initialState,
  on(registerAction, (state): AuthStateInterface =>
    ({
      ...state,
      isSubmitting: true
    })
  ),
  on(registerSuccessAction, (state, action): AuthStateInterface =>
    ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(registerFailureAction, (state, action): AuthStateInterface =>
    ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(loginAction, (state): AuthStateInterface =>
    ({
      ...state,
      isSubmitting: true
    })
  ),
  on(loginSuccessAction, (state, action): AuthStateInterface =>
    ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(loginFailureAction, (state, action): AuthStateInterface =>
    ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(getCurrentUserAction, (state): AuthStateInterface =>
    ({
      ...state,
      isLoading: true
    })
  ),
  on(getCurrentUserSuccessAction, (state, action): AuthStateInterface =>
    ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(getCurrentUserFailureAction, (state, action): AuthStateInterface =>
    ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null
    })
  ),
)

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
