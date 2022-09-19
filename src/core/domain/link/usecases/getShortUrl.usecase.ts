import { HttpResponse, IHttpResponse } from '@presentation/helpers/httpResponse';
import { ILinkRepository } from '../linkRepository.interface';

class GetShortUrlUseCase {
  constructor (private readonly linkRepository: ILinkRepository) {}

  async execute (shortUrl: string): Promise<IHttpResponse> {
    try {
      const link = await this.linkRepository.findByShortUrl(shortUrl);

      if (!link) {
        return HttpResponse.notFound();
      }

      if (link.isExpired()) {
        return HttpResponse.badRequest({ message: 'Link expired' });
      }
      await this.linkRepository.incrementHits(link);
      return HttpResponse.ok(link);
    } catch (err: any) {
      if (err.isCustomError) {
        return HttpResponse.badRequest(err);
      }
      return HttpResponse.serverError();
    }
  }
}

export { GetShortUrlUseCase };
