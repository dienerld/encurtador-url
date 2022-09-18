import { ICustomErrors } from './errors.interface';

class ShortUrlAlreadyExistes extends Error implements ICustomErrors {
  isCustomError: boolean;
  constructor () {
    super('Unauthorized');
    this.name = 'ShortUrlAlreadyExistes';
    this.isCustomError = true;
  }
}

export { ShortUrlAlreadyExistes };
