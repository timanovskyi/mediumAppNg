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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
