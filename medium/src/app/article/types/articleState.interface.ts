import { ArticleInterface } from '../../shared/types/article.interface';

export interface ArticleStateInterface {
  data: ArticleInterface | null;
  isLoading: boolean;
  error: string | null;
}
