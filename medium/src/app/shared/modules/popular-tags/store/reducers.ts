import { Action, createReducer, on } from '@ngrx/store';
import { PopularTagsStateInterface } from '../types/popular-tags-state.interface';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction
} from './actions/get-popular-tags.actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  tags: null,
  error: null
}

const popularTagsReducer = createReducer(
  initialState,
  on(getPopularTagsAction, (state): PopularTagsStateInterface =>
    ({
      ...state,
      isLoading: true
    })
  ),
  on(getPopularTagsSuccessAction, (state, action): PopularTagsStateInterface =>
    ({
      ...state,
      tags: ['test'],
      isLoading: false
    })
  ),
  on(getPopularTagsFailureAction, (state, action): PopularTagsStateInterface =>
    ({
      ...state,
      isLoading: false,
      error: action.error
    })
  ),
  on(routerNavigationAction, (): PopularTagsStateInterface => initialState),
)

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagsReducer(state, action)
}
