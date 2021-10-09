import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersistanceService } from './services/persistance.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
  ],
  providers: [
    PersistanceService
  ]
})
export class SharedModule { }
