import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfileStateInterface } from '../types/user-profile-state.interface';

export const userProfileFeatureSelector = createFeatureSelector<UserProfileStateInterface>('editArticle')

export const errorsSelector = createSelector(userProfileFeatureSelector, (state: UserProfileStateInterface) => state.validationErrors)
export const isLoadingSelector = createSelector(userProfileFeatureSelector, (state: UserProfileStateInterface) => state.isLoading)
export const profileSelector = createSelector(userProfileFeatureSelector, (state: UserProfileStateInterface) => state.profile)
