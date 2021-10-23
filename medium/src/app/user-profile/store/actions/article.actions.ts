import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { UserProfileInterface } from '../../types/user-profile.interface';

export const getUserProfileAction = createAction(
  ActionTypes.GET_USER_PROFILE,
  props<{ slug: string }>()
)

export const getUserProfileFailureAction = createAction(
  ActionTypes.GET_USER_PROFILE_FAILURE,
  props<{ error: BackendErrorsInterface }>()
)

export const getUserProfileSuccessAction = createAction(
  ActionTypes.GET_USER_PROFILE_SUCCESS,
  props<{ profile: UserProfileInterface }>()
)
