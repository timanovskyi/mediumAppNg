import { Action, createReducer, on } from '@ngrx/store';
import { SettingsStateInterface } from '../types/settings-state.interface';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from '../../core/store/actions/updateCurrentUser.actions';

const initialState: SettingsStateInterface = {
  validationErrors: null,
  isSubmitting: false
}

const settingsReducer = createReducer(
  initialState,
  on(updateCurrentUserAction, (state): SettingsStateInterface =>
    ({
      ...state,
      isSubmitting: true
    })
  ),
  on(updateCurrentUserSuccessAction, (state): SettingsStateInterface =>
    ({
      ...state,
      isSubmitting: false
    })
  ),
  on(updateCurrentUserFailureAction, (state, action): SettingsStateInterface =>
    ({
      ...state,
      validationErrors: action.errors,
      isSubmitting: false
    })
  )
)

export function reducers(state: SettingsStateInterface, action: Action) {
  return settingsReducer(state, action)
}
