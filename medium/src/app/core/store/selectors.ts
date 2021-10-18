import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreStateInterface } from '../types/coreState.interface';
import { authFeatureSelector } from '../../auth/store/selectors';

export const coreFeatureSelector = createFeatureSelector<CoreStateInterface>('core')


export const currentUserSelector = createSelector(coreFeatureSelector, (state: CoreStateInterface) => state.currentUser)
export const isAnonymousSelector = createSelector(coreFeatureSelector, (state: CoreStateInterface) => state && state.isLoggedIn === false)
export const isLoggedInSelector = createSelector(coreFeatureSelector, (state: CoreStateInterface) => state && state.isLoggedIn)
