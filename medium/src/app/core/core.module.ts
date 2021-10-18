import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './interceptors/http-header.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GetCurrentUserEffect } from './store/effects/getCurrentUser.effect';
import { CoreService } from './services/core.service';
import { reducers } from './store/reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature(
      [
        GetCurrentUserEffect,
      ]
    ),
    StoreModule.forFeature(
      'core', reducers
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true
    },
    CoreService
  ]
})
export class CoreModule { }
