import { ICustomErrors } from './errors.interface';

class InvalidParamError extends Error implements ICustomErrors {
  isCustomError: boolean;
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`);
    this.name = 'InvalidParamError';
    this.isCustomError = true;
  }
}

export { InvalidParamError };
