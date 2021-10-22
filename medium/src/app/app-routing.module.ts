import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanEnterGuard } from './core/guards/can-enter.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [CanEnterGuard],
    loadChildren: () => import('./global-feed/global-feed.module').then(m => m.GlobalFeedModule)
  },
  {
    path: 'feed',
    canActivate: [CanEnterGuard],
    loadChildren: () => import('./your-feed/your-feed.module').then(m => m.YourFeedModule)
  },
  {
    path: 'tag/:slug',
    canActivate: [CanEnterGuard],
    loadChildren: () => import('./tag-feed/tag-feed.module').then(m => m.TagFeedModule)
  },
  {
    path: 'articles',
    canActivate: [CanEnterGuard],
    loadChildren: () => import('./create-article/create-article.module').then(m => m.CreateArticleModule)
  },
  {
    path: 'articles',
    canActivate: [CanEnterGuard],
    loadChildren: () => import('./edit-article/edit-article.module').then(m => m.EditArticleModule)
  },
  {
    path: 'articles',
    canActivate: [CanEnterGuard],
    loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'settings',
    canActivate: [CanEnterGuard],
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
