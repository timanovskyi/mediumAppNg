import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PopularTagsStateInterface } from '../types/popular-tags-state.interface';

export const tagsFeatureSelector = createFeatureSelector<PopularTagsStateInterface>('popularTags')

export const tagsSelector = createSelector(tagsFeatureSelector, (state: PopularTagsStateInterface) => state.tags)
export const isLoadingSelector = createSelector(tagsFeatureSelector, (state: PopularTagsStateInterface) => state.isLoading)
export const errorsSelector = createSelector(tagsFeatureSelector, (state: PopularTagsStateInterface) => state.error)
