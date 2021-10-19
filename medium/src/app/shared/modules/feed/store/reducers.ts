import { Action, createReducer, on } from '@ngrx/store';
import { FeedStateInterface } from '../types/feedState.interface';
import { getFeedAction, getFeedFailureAction, getFeedSuccessAction } from './actions/get-feed.actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: FeedStateInterface = {
  isLoading: false,
  data: null,
  error: null
}

const feedReducer = createReducer(
  initialState,
  on(getFeedAction, (state): FeedStateInterface =>
    ({
      ...state,
      isLoading: true
    })
  ),
  on(getFeedSuccessAction, (state, action): FeedStateInterface =>
    ({
      ...state,
      data: action.feed,
      isLoading: false
    })
  ),
  on(getFeedFailureAction, (state, action): FeedStateInterface =>
    ({
      ...state,
      isLoading: false,
      error: action.error
    })
  ),
  on(routerNavigationAction, (): FeedStateInterface => initialState),
)

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReducer(state, action)
}
