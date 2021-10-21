import { Component, OnInit } from '@angular/core';
import { ArticleInputInterface } from '../../../shared/types/articleInput.interface';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { select, Store } from '@ngrx/store';
import { articleSelector, errorsSelector, isLoadingSelector, isSubmittingSelector } from '../../store/selectors';
import { getArticleAction, updateArticleAction } from '../../store/actions/article.actions';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ArticleInterface } from '../../../shared/types/article.interface';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  initialValues$: Observable<ArticleInputInterface>
  isSubmitting$: Observable<boolean> = new Observable<boolean>();
  isLoading$: Observable<boolean> = new Observable<boolean>();
  backendErrors$: Observable<BackendErrorsInterface> = new Observable<BackendErrorsInterface>();

  private _slug: string;

  constructor(private _store: Store,
              private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._initValue();
    this._fetchData();
  }

  onSubmit(articleInput: ArticleInputInterface) {
    this._store.dispatch(updateArticleAction({slug: this._slug, articleInput}))
  }

  private _initValue() {
    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector))
    this.isLoading$ = this._store.pipe(select(isLoadingSelector))
    this.backendErrors$ = this._store.pipe(select(errorsSelector))
    this.initialValues$ = this._store.pipe(select(articleSelector))
      .pipe(
        filter(Boolean),
        map((article: ArticleInterface) => {
          return {
            title: article.title,
            description: article.description,
            body: article.body,
            tagList: article.tagList,
          }
        })
      )

  }

  private _fetchData() {
    this._slug = this._route.snapshot.paramMap.get('slug');
    this._store.dispatch(getArticleAction({slug: this._slug}))
  }
}
