import { ShortUrlAlreadyExistes } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers/httpResponse';
import { TInputLink } from '../link.interface';
import { Link } from '../link.model';
import { ILinkRepository } from '../linkRepository.interface';

class CreateLinkUseCase {
  constructor (private readonly linkRepository: ILinkRepository) {}

  async execute ({ fullUrl, shortUrl, expiresAt }: TInputLink): Promise<IHttpResponse> {
    try {
      const shortUrlAlreadyExistes = shortUrl
        ? await this.linkRepository.findByShortUrl(shortUrl)
        : null;

      if (shortUrlAlreadyExistes && !shortUrlAlreadyExistes?.isExpired()) {
        throw new ShortUrlAlreadyExistes();
      }

      const link = new Link({ fullUrl, shortUrl, expiresAt });
      await this.linkRepository.save(link);

      return HttpResponse.created(link.toJSON());
    } catch (err: any) {
      if (err.isCustomError) {
        return HttpResponse.badRequest(err);
      }
      return HttpResponse.serverError();
    }
  }
}

export { CreateLinkUseCase };
