import { Action, createReducer, on } from '@ngrx/store';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from './actions/article.actions';
import { routerNavigationAction } from '@ngrx/router-store';
import { UserProfileStateInterface } from '../types/user-profile-state.interface';

const initialState: UserProfileStateInterface = {
  validationErrors: null,
  profile: null,
  isLoading: false
}

const userProfileReducer = createReducer(
  initialState,
  on(getUserProfileAction, (state): UserProfileStateInterface =>
    ({
      ...state,
      isLoading: true
    })
  ),
  on(getUserProfileSuccessAction, (state, action): UserProfileStateInterface =>
    ({
      ...state,
      isLoading: false,
      profile: action.profile
    })
  ),
  on(getUserProfileFailureAction, (state, action): UserProfileStateInterface =>
    ({
      ...state,
      isLoading: false,
      validationErrors: action.error
    })
  ),
  on(routerNavigationAction, (): UserProfileStateInterface => initialState),
)

export function reducers(state: UserProfileStateInterface, action: Action) {
  return userProfileReducer(state, action)
}
