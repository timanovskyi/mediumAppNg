import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile.routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileService } from './services/user-profile.service';
import { EffectsModule } from '@ngrx/effects';
import { GetUserProfileEffect } from './store/effects/getUserProfile.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { FeedModule } from '../shared/modules/feed/feed.module';

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    EffectsModule.forFeature(
      [
        GetUserProfileEffect
      ]
    ),
    StoreModule.forFeature(
      'userProfile', reducers
    ),
    FeedModule,
  ],
  exports: [
    UserProfileComponent
  ],
  providers: [
    UserProfileService
  ]
})
export class UserProfileModule {
}
