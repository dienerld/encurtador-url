import { Link } from '@domain/link/link.model';
import { ILinkRepository } from '@domain/link/linkRepository.interface';

class LinkRepository implements ILinkRepository {
  static links: Link[] = [];

  async save (link: Link): Promise<void> {
    const index = LinkRepository.links.findIndex(l => l.shortUrl === link.shortUrl);
    if (index === -1) {
      LinkRepository.links.push(link);
    } else {
      LinkRepository.links[index] = link;
    }
  }

  async findByShortUrl (shortUrl: string): Promise<Link| undefined> {
    return LinkRepository.links.find(link => link.shortUrl === shortUrl);
  }

  async incrementHits (link: Link): Promise<void> {
    const index = LinkRepository.links.findIndex(l => l.shortUrl === link.shortUrl);
    LinkRepository.links[index].hits++;
  }
}

export { LinkRepository };
