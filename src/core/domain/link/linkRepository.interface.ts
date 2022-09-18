import { Link } from './link.model';

interface ILinkRepository {
  save(link: Link): Promise<void>;
  findByShortUrl(shortUrl: string): Promise<Link | undefined>;
  incrementHits(link: Link): Promise<void>;
}

export { ILinkRepository };
