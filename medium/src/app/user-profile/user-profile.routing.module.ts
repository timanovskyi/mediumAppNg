import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: ':slug',
    component: UserProfileComponent
  },
  {
    path: ':slug/favorites',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {
}
