import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { CreateArticleRoutingModule } from './create-article.routing.module';
import { ArticleFormModule } from '../shared/modules/article-form/article-form.module';
import { CreateArticleService } from './services/create-article.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { CreateArticleEffect } from './store/effects/createArticle.effect';

@NgModule({
  declarations: [
    CreateArticleComponent
  ],
  imports: [
    CommonModule,
    CreateArticleRoutingModule,
    ArticleFormModule,
    EffectsModule.forFeature(
      [
        CreateArticleEffect
      ]
    ),
    StoreModule.forFeature(
      'createArticle', reducers
    ),
  ],
  exports: [
    CreateArticleComponent
  ],
  providers: [
    CreateArticleService
  ]
})
export class CreateArticleModule {
}
