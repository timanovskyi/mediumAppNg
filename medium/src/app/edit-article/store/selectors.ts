import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EditArticleStateInterface } from '../types/editArticleState.interface';

export const editArticleFeatureSelector = createFeatureSelector<EditArticleStateInterface>('editArticle')

export const isSubmittingSelector = createSelector(editArticleFeatureSelector, (state: EditArticleStateInterface) => state.isSubmitting)
export const errorsSelector = createSelector(editArticleFeatureSelector, (state: EditArticleStateInterface) => state.validationErrors)
export const isLoadingSelector = createSelector(editArticleFeatureSelector, (state: EditArticleStateInterface) => state.isLoading)
export const articleSelector = createSelector(editArticleFeatureSelector, (state: EditArticleStateInterface) => state.article)
