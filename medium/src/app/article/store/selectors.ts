import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleStateInterface } from '../types/articleState.interface';

export const articleFeatureSelector = createFeatureSelector<ArticleStateInterface>('article')

export const articlesSelector = createSelector(articleFeatureSelector, (state: ArticleStateInterface) => state.data)
export const isLoadingSelector = createSelector(articleFeatureSelector, (state: ArticleStateInterface) => state.isLoading)
export const errorsSelector = createSelector(articleFeatureSelector, (state: ArticleStateInterface) => state.error)
