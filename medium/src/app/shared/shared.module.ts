import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorMessagesModule } from './modules/backend-error-messages/backend-error-messages.module';
import { PersistanceService } from './services/persistance.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BackendErrorMessagesModule
  ],
  exports: [
    BackendErrorMessagesModule,
  ],
  providers: [
    PersistanceService
  ]
})
export class SharedModule { }
