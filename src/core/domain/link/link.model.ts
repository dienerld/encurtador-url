import { createHash } from 'crypto';
import { TInputLink } from './link.interface';

function setExpiresAt (days:number): Date {
  const ms = 1000;
  const seconds = 60;
  const minutes = 60;
  const hours = 24;
  const daysInTimeStamp = days * ms * seconds * minutes * hours;

  return new Date(new Date().getTime() + daysInTimeStamp);
}

class Link {
  #fullUrl: string;
  #shortUrl: string;
  #createdAt: Date;
  #expiresAt: Date;
  #hits: number;

  constructor (link: TInputLink) {
    if (!link.fullUrl) {
      throw new Error('Full url is required');
    }
    // validar url com regex
    if (!(/^(http|https):\/\/[^ "]+$/gi.test(link.fullUrl))) {
      throw new Error('Full url is invalid');
    }

    this.#fullUrl = link.fullUrl;
    this.#expiresAt = link.expiresAt || setExpiresAt(7);
    this.#createdAt = new Date();
    this.#hits = 0;

    if (link.shortUrl) {
      this.#shortUrl = link.shortUrl;
    } else {
      const hash = createHash('md5').update(String(new Date().getTime()))
        .digest('hex').substring(0, 6);
      this.#shortUrl = hash;
    }
  }

  get fullUrl (): string {
    return this.#fullUrl;
  }

  get shortUrl (): string {
    return this.#shortUrl;
  }

  get createdAt (): Date {
    return this.#createdAt;
  }

  get expiresAt (): Date {
    return this.#expiresAt;
  }

  get hits (): number {
    return this.#hits;
  }

  set hits (hits: number) {
    this.#hits = hits;
  }
}

export { Link };
