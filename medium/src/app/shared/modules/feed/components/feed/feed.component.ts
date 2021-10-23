import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getFeedAction } from '../../store/actions/get-feed.actions';
import { Observable, Subscription } from 'rxjs';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';
import { errorsSelector, feedsSelector, isLoadingSelector } from '../../store/selectors';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {stringify, parseUrl} from 'query-string'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {

  @Input() apiUrl: string = ''

  feed$: Observable<GetFeedResponseInterface | null> = new Observable<GetFeedResponseInterface>();
  isLoading$: Observable<boolean> = new Observable<false>();
  errors$: Observable<string | null> = new Observable<''>();
  limit = environment.limit;
  baseUrl: string;
  currentPage: number;


  private _sub: Subscription = new Subscription();
  constructor(private _store: Store,
              private _route: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._initValues();
    this._initListeners();
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.apiUrl.firstChange && changes.apiUrl.currentValue !== changes.apiUrl.previousValue) {
      this._fetchFeed();
    }
  }

  private _initValues() {
    this.feed$ = this._store.pipe(select(feedsSelector))
    this.isLoading$ = this._store.pipe(select(isLoadingSelector))
    this.errors$ = this._store.pipe(select(errorsSelector))
    this.baseUrl = this._router.url.split('?')[0];
  }

  private _fetchFeed() {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = parseUrl(this.apiUrl)
    const stringifiedParams = stringify(
      {
        limit: this.limit,
        offset,
        ...parsedUrl.query
      }
    )
    const fullUrl  = `${parsedUrl.url}?${stringifiedParams}`;
    this._store.dispatch(getFeedAction({url: fullUrl}))

  }

  private _initListeners() {
    this._sub.add(
      this._route.queryParams
        .subscribe((params: Params) => {
          this.currentPage = +params['page'] || 1;
          this._fetchFeed();
        }
    ))
  }
}
