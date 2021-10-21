import { Component, OnInit } from '@angular/core';
import { ArticleInputInterface } from '../../../shared/types/articleInput.interface';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { select, Store } from '@ngrx/store';
import { errorsSelector, isSubmittingSelector } from '../../store/selectors';
import { createArticleAction } from '../../store/actions/article.actions';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }


  isSubmitting$: Observable<boolean> = new Observable<boolean>();
  backendErrors$: Observable<BackendErrorsInterface> = new Observable<BackendErrorsInterface>();

  constructor(private _store: Store) {
  }

  ngOnInit(): void {
    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this._store.pipe(select(errorsSelector))
  }

  onSubmit(articleInput: ArticleInputInterface) {
    this._store.dispatch(createArticleAction({articleInput}))
  }
}
