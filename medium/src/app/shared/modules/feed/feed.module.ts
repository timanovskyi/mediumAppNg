import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';



@NgModule({
  declarations: [
    FeedComponent
  ],
  exports: [
    FeedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeedModule { }
