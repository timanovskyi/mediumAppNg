import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeedStateInterface } from '../types/feedState.interface';

export const feedFeatureSelector = createFeatureSelector<FeedStateInterface>('feed')

export const feedsSelector = createSelector(feedFeatureSelector, (state: FeedStateInterface) => state.data)
export const isLoadingSelector = createSelector(feedFeatureSelector, (state: FeedStateInterface) => state.isLoading)
export const errorsSelector = createSelector(feedFeatureSelector, (state: FeedStateInterface) => state.error)
