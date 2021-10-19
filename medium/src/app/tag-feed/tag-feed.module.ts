import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagFeedComponent } from './components/tag-feed/tag-feed.component';
import { TagFeedRoutingModule } from './tag-feed.routing.module';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { BannerModule } from '../shared/modules/banner/banner.module';
import { PopularTagsModule } from '../shared/modules/popular-tags/popular-tags.module';
import { FeedTogglerModule } from '../shared/modules/feed-toggler/feed-toggler.module';



@NgModule({
  declarations: [
    TagFeedComponent
  ],
  imports: [
    CommonModule,
    TagFeedRoutingModule,
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedTogglerModule,
  ]
})
export class TagFeedModule { }
