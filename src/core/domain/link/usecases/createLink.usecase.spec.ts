import { Link } from '../link.model';
import { ILinkRepository } from '../linkRepository.interface';
import { CreateLinkUseCase } from './createLink.usecase';

describe('Create Link Use Case', () => {
  const makeSut = () => {
    class LinkRepositoryMock implements ILinkRepository {
      links: Link[] = [];

      async save (link: Link): Promise<void> {
        this.links.push(link);
      }

      async findByShortUrl (shortUrl: string): Promise<Link> {
        const url = this.links.find((link) => link.shortUrl === shortUrl);
        if (!url) {
          throw new Error('Not found');
        }
        return url;
      }

      async incrementHits (link: Link): Promise<void> {
        const url = this.links.find((currentLink) => link.shortUrl === currentLink.shortUrl);
        if (!url) {
          throw new Error('Not found');
        }
        url.hits++;
        this.save(url);
      }
    }
    const linkRepositoryMock = new LinkRepositoryMock();
    const sut = new CreateLinkUseCase(linkRepositoryMock);

    const dateExpiresAt = new Date();
    const link = {
      fullUrl: 'http://fullUrl',
      shortUrl: 'shortUrl',
      expiresAt: dateExpiresAt
    };

    return { sut, linkRepositoryMock, link, dateExpiresAt };
  };

  it('create link with full params', async () => {
    const { sut, link, dateExpiresAt } = makeSut();

    const { body: response } = await sut.execute(link);

    expect(response.fullUrl).toBe(link.fullUrl);
    expect(response.shortUrl).toBe(link.shortUrl);
    expect(response.expiresAt).toBe(dateExpiresAt);
  });

  it('create link without shortUrl params', async () => {
    const { sut, link, dateExpiresAt } = makeSut();

    const { body: response } = await sut.execute({ ...link, shortUrl: undefined });

    expect(response.fullUrl).toBe(link.fullUrl);
    expect(response.expiresAt).toBe(dateExpiresAt);

    expect(response.shortUrl).toBeTruthy();
  });

  it('create link without expiresAt params', async () => {
    const { sut, link, dateExpiresAt } = makeSut();

    const { body: response } = await sut.execute({
      ...link,
      expiresAt: undefined
    });

    const dateIncrement7Days = dateExpiresAt.getTime() + (7 * 24 * 60 * 60 * 1000);
    expect(response.fullUrl).toBe(link.fullUrl);
    expect(response.shortUrl).toBe(link.shortUrl);
    expect(response.expiresAt.getDate()).toBe(new Date(dateIncrement7Days).getDate());
  });

  it('create link without params', async () => {
    const { sut } = makeSut();

    // @ts-ignore
    const { statusCode, body: response } = await sut.execute({});

    expect(statusCode).toBe(400);
    expect(response).toBe('Required param: fullUrl');
  });

  it('create link with incorrect params', async () => {
    const { sut } = makeSut();

    // @ts-ignore
    const { statusCode, body: response } = await sut.execute({ fullUrl: 1 });

    expect(statusCode).toBe(400);
    expect(response).toBe('Invalid param: fullUrl');
  });
});
