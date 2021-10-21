import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleInputInterface } from '../../../../types/articleInput.interface';
import { BackendErrorsInterface } from '../../../../types/backendErrors.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  @Input() initialValues: ArticleInputInterface;
  @Input() isSubmitting: boolean
  @Input() errors: BackendErrorsInterface

  @Output() articleSubmit: EventEmitter<ArticleInputInterface> = new EventEmitter<ArticleInputInterface>()

  form: FormGroup;

  constructor(private _fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this._init();
  }

  private _init() {
    this.form = this._fb.group({
        title: this.initialValues.title,
        description: this.initialValues.description,
        body: this.initialValues.body,
        tagList: this.initialValues.tagList.join(' ')
      }
    )
  }

  onSubmit(event) {
    const sendValue = {
      title: this.form.value.title,
      description: this.form.value.description,
      body: this.form.value.body,
      tagList: this.form.value.tagList.split(' ')
    }
    this.articleSubmit.emit(sendValue)
  }
}
