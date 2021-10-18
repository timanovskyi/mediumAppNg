import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from './store/effects/register.effect';
import { SharedModule } from '../shared/shared.module';
import { LoginEffect } from './store/effects/login.effect';
import { BackendErrorMessagesModule } from '../shared/modules/backend-error-messages/backend-error-messages.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(
      [
        RegisterEffect,
        LoginEffect
      ]
    ),
    StoreModule.forFeature(
      'auth', reducers
    ),
    BackendErrorMessagesModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
}
