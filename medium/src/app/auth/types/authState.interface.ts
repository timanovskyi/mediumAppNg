import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
  isLoading: boolean
}
