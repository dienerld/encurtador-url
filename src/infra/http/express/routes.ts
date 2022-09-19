import { CreateLinkUseCase } from '@domain/link/usecases/createLink.usecase';
import { GetShortUrlUseCase } from '@domain/link/usecases/getShortUrl.usecase';
import { GetStatsUrlUseCase } from '@domain/link/usecases/getStatsUrrl.usecase';
import { LinkRepository } from '@infra/database/in-memory';
import { Router } from 'express';

const routes = Router();

const repository = new LinkRepository();
const createLinkUseCase = new CreateLinkUseCase(repository);
const getShortUrlUseCase = new GetShortUrlUseCase(repository);
const getStatsUrlUseCase = new GetStatsUrlUseCase(repository);

routes.get('/', (_, response) => response.json({ message: 'Hello World' }));

routes.post('/links', async (request, response) => {
  const { body: bodyRequest } = request;

  const { body, statusCode } = await createLinkUseCase.execute(bodyRequest);

  return response.status(statusCode).json({
    ...body,
    shortUrl: body.shortUrl
      ? `${request.protocol}://${request.get('host')}/${body.shortUrl}`
      : undefined
  });
});

routes.get('/:shortUrl', async (request, response) => {
  const { shortUrl } = request.params;

  const { body, statusCode } = await getShortUrlUseCase.execute(shortUrl);
  if (statusCode === 200) {
    return response.status(statusCode).redirect(body.fullUrl);
  }
  return response.status(statusCode).json(body);
});

export { routes };

routes.get('/:shortUrl/stats', async (request, response) => {
  const { shortUrl } = request.params;

  const { body, statusCode } = await getStatsUrlUseCase.execute(shortUrl);

  return response.status(statusCode).json(body);
});
