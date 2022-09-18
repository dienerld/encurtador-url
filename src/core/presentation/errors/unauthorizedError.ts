import { ICustomErrors } from './errors.interface';

class UnauthorizedError extends Error implements ICustomErrors {
  isCustomError: boolean;
  constructor () {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
    this.isCustomError = true;
  }
}

export { UnauthorizedError };
