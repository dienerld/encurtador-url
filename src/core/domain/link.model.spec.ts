import { Link } from './link.model';

describe('Create Link', () => {
  it('create user with full params', () => {
    const expiresAt = new Date();
    const link = new Link({
      fullUrl: 'fullUrl',
      shortUrl: 'shortUrl',
      expiresAt
    });

    console.log(link.expiresAt + '');

    expect(link.fullUrl).toBe('fullUrl');
    expect(link.shortUrl).toBe('shortUrl');
    expect(link.expiresAt).toBe(expiresAt);
  });

  it('create user with correct params', () => {
    const link = new Link({
      fullUrl: 'fullUrl'
    });

    expect(link.fullUrl).toBe('fullUrl');
    expect(link.shortUrl).toBeTruthy();
  });

  it('create user with incorrect params', () => {
    // @ts-ignore
    expect(() => new Link({})).toThrow();
  });
});
