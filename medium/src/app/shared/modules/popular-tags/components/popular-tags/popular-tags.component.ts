import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { PopularTagType } from '../../../../types/popularTag.type';
import { errorsSelector, isLoadingSelector, tagsSelector } from '../../store/selectors';
import { getPopularTagsAction } from '../../store/actions/get-popular-tags.actions';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit {

  tags$: Observable<PopularTagType[] | null> = new Observable<PopularTagType[]>();
  isLoading$: Observable<boolean> = new Observable<false>();
  errors$: Observable<string [] | null> = new Observable<[]>();

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.dispatch(getPopularTagsAction())
    this._initValues();
  }


  private _initValues() {
    this.tags$ = this._store.pipe(select(tagsSelector))
    this.isLoading$ = this._store.pipe(select(isLoadingSelector))
    this.errors$ = this._store.pipe(select(errorsSelector))
  }
}
