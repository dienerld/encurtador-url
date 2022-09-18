import { HttpResponse, IHttpResponse } from '@presentation/helpers/httpResponse';
import { ILinkRepository } from '../linkRepository.interface';

class GetShortUrlUseCase {
  constructor (private readonly linkRepository: ILinkRepository) {}

  async execute (shortUrl: string): Promise<IHttpResponse> {
    const link = await this.linkRepository.findByShortUrl(shortUrl);

    if (!link) {
      throw HttpResponse.notFound();
    }

    if (link.isExpired()) {
      throw HttpResponse.notFound();
    }

    return HttpResponse.ok(link);
  }
}

export { GetShortUrlUseCase };
