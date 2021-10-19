import { PopularTagType } from '../../../types/popularTag.type';

export interface PopularTagsStateInterface {
  error: string[] | null;
  isLoading: boolean;
  tags: PopularTagType[] | null;
}
