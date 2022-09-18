import { ICustomErrors } from './errors.interface';

class ServerError extends Error implements ICustomErrors {
  isCustomError: boolean;
  constructor () {
    super('Internal server error');
    this.name = 'ServerError';
    this.isCustomError = true;
  }
}

export { ServerError };
