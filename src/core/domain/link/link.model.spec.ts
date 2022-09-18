import { Link } from './link.model';

describe('Create Link', () => {
  it('create user with full params', () => {
    const expiresAt = new Date();
    const url = 'http://fullUrl';

    const link = new Link({
      fullUrl: url,
      shortUrl: 'shortUrl',
      expiresAt
    });

    expect(link.fullUrl).toBe(url);
    expect(link.shortUrl).toBe('shortUrl');
    expect(link.expiresAt).toBe(expiresAt);
  });

  it('create user with correct params', () => {
    const url = 'http://fullUrl';
    const link = new Link({
      fullUrl: url
    });

    expect(link.fullUrl).toBe(url);
    expect(link.shortUrl).toBeTruthy();
  });

  it('create user with incorrect params', () => {
    // @ts-ignore
    expect(() => new Link({})).toThrow();
  });
});
