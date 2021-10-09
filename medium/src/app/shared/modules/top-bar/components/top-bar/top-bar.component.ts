import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from '../../../../types/currentUser.interface';
import { select, Store } from '@ngrx/store';
import { currentUserSelector, isAnonymousSelector, isLoggedInSelector } from '../../../../../auth/store/selectors';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  isLoggedIn$?: Observable<boolean | null>;
  isAnonymous$?: Observable<boolean>;
  currentUser$?: Observable<CurrentUserInterface | null>;
  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._initializeValues();
  }

  private _initializeValues() {
     this.isAnonymous$ = this._store.pipe(select(isAnonymousSelector));
    this.isLoggedIn$ = this._store.pipe(select(isLoggedInSelector));
    this.currentUser$ = this._store.pipe(select(currentUserSelector));
  }
}
