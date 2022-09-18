import { ICustomErrors } from './errors.interface';

class RequiredParamError extends Error implements ICustomErrors {
  isCustomError: boolean;
  constructor (paramName: string) {
    super(`Required param: ${paramName}`);
    this.name = 'RequiredParamError';
    this.isCustomError = true;
  }
}

export { RequiredParamError };
