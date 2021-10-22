import { Action, createReducer, on } from '@ngrx/store';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
  updateStateOfCurrentUserAction
} from './actions/getCurrentUser.actions';
import { CoreStateInterface } from '../types/coreState.interface';
import { updateCurrentUserSuccessAction } from './actions/updateCurrentUser.actions';
import { logoutAction } from './actions/sync.actions';

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
  on(updateStateOfCurrentUserAction, (state, action): CoreStateInterface =>
    ({
      ...state,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(updateCurrentUserSuccessAction, (state, action): CoreStateInterface =>
    ({
      ...state,
      currentUser: action.currentUser
    })
  ),
  on(logoutAction, (state) => ({
      ...state,
      ...initialState,
      isLoggedIn: false
    })
  )
)

export function reducers(state: CoreStateInterface, action: Action) {
  return coreReducer(state, action)
}
