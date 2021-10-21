import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './components/create-article/edit-article.component';
import { EditArticleRoutingModule } from './edit-article.routing.module';
import { ArticleFormModule } from '../shared/modules/article-form/article-form.module';
import { EditArticleService } from './services/edit-article.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { UpdateArticleEffect } from './store/effects/updateArticle.effect';
import { GetArticleEffect } from './store/effects/getArticle.effect';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { ArticleSharedService } from '../shared/services/articleShared.service';

@NgModule({
  declarations: [
    EditArticleComponent
  ],
  imports: [
    CommonModule,
    EditArticleRoutingModule,
    ArticleFormModule,
    EffectsModule.forFeature(
      [
        UpdateArticleEffect,
        GetArticleEffect
      ]
    ),
    StoreModule.forFeature(
      'editArticle', reducers
    ),
    LoadingModule,
  ],
  exports: [
    EditArticleComponent
  ],
  providers: [
    EditArticleService,
    ArticleSharedService
  ]
})
export class EditArticleModule {
}
