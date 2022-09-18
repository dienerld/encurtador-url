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

    return { sut, linkRepositoryMock };
  };

  it('create link with full params', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      fullUrl: 'fullUrl',
      shortUrl: 'shortUrl',
      expiresAt: new Date()
    });

    expect(response.fullUrl).toBe('fullUrl');
    expect(response.shortUrl).toBe('shortUrl');
    expect(response.expiresAt).toBeTruthy();
  });
});
