import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { select, Store } from '@ngrx/store';
import { UserProfileInterface } from '../../types/user-profile.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { getUserProfileAction } from '../../store/actions/article.actions';
import { errorsSelector, isLoadingSelector, profileSelector } from '../../store/selectors';
import { filter, map } from 'rxjs/operators';
import { currentUserSelector } from '../../../core/store/selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  slug: string;
  userProfile: UserProfileInterface;
  isLoading$: Observable<boolean> = new Observable<boolean>();
  backendErrors$: Observable<BackendErrorsInterface> = new Observable<BackendErrorsInterface>();
  isCurrentUserProfile$: Observable<boolean>

  private _sub: Subscription = new Subscription();

  constructor(private _store: Store,
              private _route: ActivatedRoute,
              private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this._initValues();
  }

  ngOnDestroy() {
    this._sub.unsubscribe()
  }

  getApiUrl(): string {
    const favorites = this._router.url.includes('favorites')
    return favorites
      ? `articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`
  }

  private _initValues() {
    this._route.snapshot.paramMap.get('slug');

    this.isLoading$ = this._store.pipe(select(isLoadingSelector))
    this.backendErrors$ = this._store.pipe(select(errorsSelector))
    this._sub.add(
      this._store.pipe(select(profileSelector))
        .subscribe((v: UserProfileInterface) => this.userProfile = v)
    )

    this.isCurrentUserProfile$ = combineLatest(
      [
        this._store.pipe(select(profileSelector), filter(Boolean)),
        this._store.pipe(select(currentUserSelector), filter(Boolean))
      ])
      .pipe(
        map(([profile, currentUser]) => {
            return profile['username'] === currentUser['username']
          }
        )
      )

    this._sub.add(
      this._route.params.subscribe(p => {
        this.slug = p.slug;
        this._fetchData();
      })
    )
  }

  private _fetchData() {
    this._store.dispatch(getUserProfileAction({slug: this.slug}))
  }
}
