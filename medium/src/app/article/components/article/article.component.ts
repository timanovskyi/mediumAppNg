import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { deleteArticleAction, getArticleAction } from '../../store/actions/article.actions';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { articlesSelector, errorsSelector, isLoadingSelector } from '../../store/selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { currentUserSelector } from '../../../core/store/selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  article: ArticleInterface;
  article$: Observable<ArticleInterface | null> = new Observable<ArticleInterface>();
  isLoading$: Observable<boolean> = new Observable<false>();
  isAuthor$: Observable<boolean>;
  errors$: Observable<string | null> = new Observable<''>();

  slug: string;

  private _sub: Subscription = new Subscription();

  constructor(private _store: Store,
              private _route: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._initValues();
    this._initListeners();
    this._fetchFeed();
  }

  ngOnDestroy() {
    this._sub.unsubscribe()
  }

  private _initValues() {
    this.isLoading$ = this._store.pipe(select(isLoadingSelector))
    this.errors$ = this._store.pipe(select(errorsSelector))
    this.isAuthor$ = combineLatest(
      [
        this._store.pipe(select(articlesSelector)),
        this._store.pipe(select(currentUserSelector))
      ])
      .pipe(
        map(([article, currentUser]) => {
          if (!article || !currentUser) {
            return false
          }
          return article.author.username === currentUser.username
          }
        )
      )
  }

  private _fetchFeed() {
    this.slug = this._route.snapshot.paramMap.get('slug');
    this._store.dispatch(getArticleAction({slug: this.slug}))
  }

  private _initListeners() {
    this._store.pipe(select(articlesSelector)).subscribe(v => this.article = v)
  }

  onDelete($event: MouseEvent) {
    this._store.dispatch(deleteArticleAction({slug: this.slug}))
  }
}
