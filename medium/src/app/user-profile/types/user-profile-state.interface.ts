import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';
import { UserProfileInterface } from './user-profile.interface';

export interface UserProfileStateInterface {
  validationErrors: BackendErrorsInterface | null;
  isLoading: boolean;
  profile: UserProfileInterface | null;

}
