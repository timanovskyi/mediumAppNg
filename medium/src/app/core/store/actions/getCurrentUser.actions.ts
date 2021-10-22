import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';

export const getCurrentUserAction = createAction(
  ActionTypes.GET_CURRENT_USER
)

export const updateStateOfCurrentUserAction = createAction(
  ActionTypes.UPDATE_STATE_OF_CURRENT_USER,
  props<{ currentUser: CurrentUserInterface }>()
)

export const getCurrentUserFailureAction = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE
)

export const getCurrentUserSuccessAction = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
)
