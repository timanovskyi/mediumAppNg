import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { PopularTagType } from '../../../../types/popularTag.type';

export const getPopularTagsAction = createAction(
  ActionTypes.GET_POPULAR_TAGS
)

export const getPopularTagsFailureAction = createAction(
  ActionTypes.GET_POPULAR_TAGS_FAILURE,
  props<{error: any}>()
)

export const getPopularTagsSuccessAction = createAction(
  ActionTypes.GET_POPULAR_TAGS_SUCCESS,
  props<{tags: PopularTagType[]}>()
)
