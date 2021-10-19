import { GetFeedResponseInterface } from './getFeedResponse.interface';

export interface FeedStateInterface {
  data: GetFeedResponseInterface | null;
  isLoading: boolean;
  error: string | null;
}
