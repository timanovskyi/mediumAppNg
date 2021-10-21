import { Action, createReducer, on } from '@ngrx/store';
import { EditArticleStateInterface } from '../types/editArticleState.interface';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from './actions/article.actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: EditArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
  article: null,
  isLoading: false
}

const editArticleReducer = createReducer(
  initialState,
  on(updateArticleAction, (state): EditArticleStateInterface =>
    ({
      ...state,
      isSubmitting: true
    })
  ),
  on(updateArticleSuccessAction, (state): EditArticleStateInterface =>
    ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(updateArticleFailureAction, (state, action): EditArticleStateInterface =>
    ({
      ...state,
      isSubmitting: false,
      validationErrors: action.error
    })
  ),
  on(getArticleAction, (state): EditArticleStateInterface =>
    ({
      ...state,
      isLoading: true
    })
  ),
  on(getArticleSuccessAction, (state, action): EditArticleStateInterface =>
    ({
      ...state,
      article: action.article,
      isLoading: false,
    })
  ),
  on(getArticleFailureAction, (state): EditArticleStateInterface =>
    ({
      ...state,
      isLoading: false
    })
  ),
  on(routerNavigationAction, (): EditArticleStateInterface => initialState),
)

export function reducers(state: EditArticleStateInterface, action: Action) {
  return editArticleReducer(state, action)
}
