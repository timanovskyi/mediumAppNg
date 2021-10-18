import { AuthStateInterface } from '../types/authState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { registerAction, registerFailureAction, registerSuccessAction } from './actions/register.actions';
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
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
    })
  ),
  on(loginFailureAction, (state, action): AuthStateInterface =>
    ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
)

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
