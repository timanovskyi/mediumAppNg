import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToFavoritesAction } from '../../store/actions/add-to-favorites.actions';

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss']
})
export class AddToFavoritesComponent implements OnInit {

  @Input() isFavorites: boolean
  @Input() articleSlug: string;
  @Input() favoritesCount: number;

  constructor(private _store: Store) {
  }

  ngOnInit(): void {
  }

  handleClick() {
    this._store.dispatch(addToFavoritesAction({isFavorited: this.isFavorites, slug: this.articleSlug}))
    if (this.isFavorites) {
      this.favoritesCount = this.favoritesCount - 1
    } else {
      this.favoritesCount = this.favoritesCount + 1
    }

    this.isFavorites = !this.isFavorites;
  }
}
