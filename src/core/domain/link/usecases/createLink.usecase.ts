import { HttpResponse, IHttpResponse } from '../../../presentation/helpers/httpResponse';
import { TInputLink } from '../link.interface';
import { Link } from '../link.model';
import { ILinkRepository } from '../linkRepository.interface';

class CreateLinkUseCase {
  constructor (private readonly linkRepository: ILinkRepository) {}

  async execute ({ fullUrl, shortUrl, expiresAt }: TInputLink): Promise<IHttpResponse> {
    try {
      const link = new Link({ fullUrl, shortUrl, expiresAt });
      await this.linkRepository.save(link);
      return HttpResponse.created(link);
    } catch (err: any) {
      return HttpResponse.badRequest(err.message);
    }
  }
}

export { CreateLinkUseCase };
