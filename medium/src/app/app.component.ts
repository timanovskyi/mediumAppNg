import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from './core/store/actions/getCurrentUser.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _store: Store) {
  }

  ngOnInit() {
    setTimeout(() => {
      this._store.dispatch(getCurrentUserAction())
    }, 500)

  }
}
