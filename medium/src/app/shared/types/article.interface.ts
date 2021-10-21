import { ProfileInterface } from './profile.interface';
import { PopularTagType } from './popularTag.type';

export interface ArticleInterface {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: PopularTagType[];
  description: string;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileInterface;

}
