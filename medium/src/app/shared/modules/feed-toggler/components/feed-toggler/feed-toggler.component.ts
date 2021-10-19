import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedInSelector } from '../../../../../core/store/selectors';

@Component({
  selector: 'app-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss']
})
export class FeedTogglerComponent implements OnInit {

  @Input() tagName: string;

  isLoggedIn$: Observable<boolean>;

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._init();
  }

  private _init() {
    this.isLoggedIn$ = this._store.pipe(select(isLoggedInSelector))
  }
}
