import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToFavoritesComponent } from './components/add-to-favorites/add-to-favorites.component';
import { AddToFavoritesService } from './services/addToFavorites.service';
import { EffectsModule } from '@ngrx/effects';
import { AddToFavoritesEffect } from './store/effects/add-to-favorites.effect';



@NgModule({
  declarations: [
    AddToFavoritesComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature(
      [
        AddToFavoritesEffect
      ]
    )
  ],
  exports: [
    AddToFavoritesComponent
  ],
  providers: [
    AddToFavoritesService
  ]
})
export class AddToFavoritesModule { }
