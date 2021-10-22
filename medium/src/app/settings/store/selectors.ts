import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsStateInterface } from '../types/settings-state.interface';

export const settingsFeatureSelector = createFeatureSelector<SettingsStateInterface>('settings')

export const isSubmittingSelector = createSelector(settingsFeatureSelector, (state: SettingsStateInterface) => state.isSubmitting)
export const errorsSelector = createSelector(settingsFeatureSelector, (state: SettingsStateInterface) => state.validationErrors)
