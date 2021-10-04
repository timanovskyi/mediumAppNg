import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../../../types/backendErrors.interface';

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {

  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface | null | undefined;

  errorMessages: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string) => {
      // @ts-ignore
      const messages = this.backendErrorsProps[name].join('');
      return `${name} ${messages}`
    })
  }

}
