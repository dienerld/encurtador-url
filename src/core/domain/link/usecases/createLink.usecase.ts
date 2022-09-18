import { TInputLink } from '../link.interface';
import { Link } from '../link.model';
import { ILinkRepository } from '../linkRepository.interface';

class CreateLinkUseCase {
  constructor (private readonly linkRepository: ILinkRepository) {}

  async execute ({ fullUrl, shortUrl, expiresAt }: TInputLink): Promise<Link> {
    const link = new Link({ fullUrl, shortUrl, expiresAt });
    await this.linkRepository.save(link);
    return link;
  }
}

export { CreateLinkUseCase };
