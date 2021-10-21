import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import { ArticleSharedService } from '../shared/services/articleShared.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ArticleEffect } from './store/effects/article.effect';
import { reducers } from './store/reducers';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from '../shared/modules/error-message/error-message.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { TagListModule } from '../shared/modules/tag-list/tag-list.module';
import { PaginationModule } from '../shared/modules/pagination/pagination.module';
import { ArticleRoutingModule } from './article.routing.module';
import { BannerModule } from '../shared/modules/banner/banner.module';
import { ArticleService } from './services/article.service';

@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    ErrorMessageModule,
    LoadingModule,
    PaginationModule,
    TagListModule,
    EffectsModule.forFeature(
      [
        ArticleEffect
      ]
    ),
    StoreModule.forFeature(
      'article', reducers
    ),
    RouterModule,
    BannerModule,
  ],
  providers: [
    ArticleSharedService,
    ArticleService
  ],

})
export class ArticleModule {
}
