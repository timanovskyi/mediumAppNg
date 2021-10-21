import { PopularTagType } from './popularTag.type';

export interface ArticleInputInterface {
  title: string;
  description: string;
  tagList: PopularTagType[];
  body: string;
}
