import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { PopularTagsService } from './services/popular-tags.service';
import { LoadingModule } from '../loading/loading.module';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GetPopularTagsEffect } from './store/effects/get-popular-tags.effect';
import { RouterModule } from '@angular/router';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [
    PopularTagsComponent
  ],
  imports: [
    CommonModule,
    LoadingModule,
    ErrorMessageModule,
    EffectsModule.forFeature(
      [
        GetPopularTagsEffect
      ]
    ),
    StoreModule.forFeature(
      'popularTags', reducers
    ),
    RouterModule,
  ],
  exports: [
    PopularTagsComponent
  ],
  providers: [
    PopularTagsService
  ]
})
export class PopularTagsModule {
}
