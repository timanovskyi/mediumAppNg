import { Action, createReducer, on } from '@ngrx/store';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction, updateCurrentUserAction
} from './actions/getCurrentUser.actions';
import { CoreStateInterface } from '../types/coreState.interface';

const initialState: CoreStateInterface = {
  currentUser: null,
  isLoggedIn: null,
  isLoading: true,
  validationErrors: null
}

const coreReducer = createReducer(
  initialState,
  on(getCurrentUserAction, (state): CoreStateInterface =>
    ({
      ...state,
      isLoading: true
    })
  ),
  on(getCurrentUserSuccessAction, (state, action): CoreStateInterface =>
    ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(getCurrentUserFailureAction, (state, action): CoreStateInterface =>
    ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null
    })
  ),
  on(updateCurrentUserAction, (state, action): CoreStateInterface =>
    ({
      ...state,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
)

export function reducers(state: CoreStateInterface, action: Action) {
  return coreReducer(state, action)
}
