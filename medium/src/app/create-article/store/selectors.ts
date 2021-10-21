import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CreateArticleStateInterface } from '../types/createArticleState.interface';

export const createArticleFeatureSelector = createFeatureSelector<CreateArticleStateInterface>('createArticle')

export const isSubmittingSelector = createSelector(createArticleFeatureSelector, (state: CreateArticleStateInterface) => state.isSubmitting)
export const errorsSelector = createSelector(createArticleFeatureSelector, (state: CreateArticleStateInterface) => state.validationErrors)
