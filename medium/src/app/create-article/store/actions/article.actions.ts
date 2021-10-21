import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { ArticleInputInterface } from '../../../shared/types/articleInput.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';

export const createArticleAction = createAction(
  ActionTypes.CREATE_ARTICLE,
  props<{ articleInput: ArticleInputInterface }>()
)

export const createArticleFailureAction = createAction(
  ActionTypes.CREATE_ARTICLE_FAILURE,
  props<{ error: BackendErrorsInterface }>()
)

export const createArticleSuccessAction = createAction(
  ActionTypes.CREATE_ARTICLE_SUCCESS,
  props<{ article: ArticleInterface }>()
)
