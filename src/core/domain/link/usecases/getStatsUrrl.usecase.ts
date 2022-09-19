import { LinkRepository } from '@infra/database/in-memory';
import { HttpResponse, IHttpResponse } from '@presentation/helpers/httpResponse';

class GetStatsUrlUseCase {
  constructor (private readonly linkRepository: LinkRepository) {
  }

  async execute (shortUrl: string): Promise<IHttpResponse> {
    const link = await this.linkRepository.findByShortUrl(shortUrl);
    if (!link) {
      return HttpResponse.notFound();
    }
    if (link.isExpired()) {
      return HttpResponse.badRequest({ message: 'Link expired' });
    }
    return HttpResponse.ok(link);
  }
}

export { GetStatsUrlUseCase };
