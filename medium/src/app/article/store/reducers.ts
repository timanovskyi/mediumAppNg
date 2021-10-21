import { Action, createReducer, on } from '@ngrx/store';
import { ArticleStateInterface } from '../types/articleState.interface';
import { routerNavigationAction } from '@ngrx/router-store';
import {
  deleteArticleAction, deleteArticleFailureAction, deleteArticleSuccessAction,
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction
} from './actions/article.actions';

const initialState: ArticleStateInterface = {
  isLoading: false,
  data: null,
  error: null
}

const articleReducer = createReducer(
  initialState,
  on(getArticleAction, (state): ArticleStateInterface =>
    ({
      ...state,
      isLoading: true
    })
  ),
  on(getArticleSuccessAction, (state, action): ArticleStateInterface =>
    ({
      ...state,
      data: action.article,
      isLoading: false
    })
  ),
  on(getArticleFailureAction, (state, action): ArticleStateInterface =>
    ({
      ...state,
      isLoading: false,
      error: action.error
    })
  ),
  on(routerNavigationAction, (): ArticleStateInterface => initialState),
)

export function reducers(state: ArticleStateInterface, action: Action) {
  return articleReducer(state, action)
}
