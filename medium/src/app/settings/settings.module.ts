import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsRoutingModule } from './settings.routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../core/store/reducers';
import { BackendErrorMessagesModule } from '../shared/modules/backend-error-messages/backend-error-messages.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      'settings', reducers
    ),
    SettingsRoutingModule,
    BackendErrorMessagesModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
