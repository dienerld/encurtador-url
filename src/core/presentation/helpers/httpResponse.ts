import { ServerError } from '../errors/serverError';
import { UnauthorizedError } from '../errors/unauthorizedError';

export interface IHttpResponse {
  statusCode: number;
  body: any;
}

class HttpResponse {
  static badRequest (error: any): IHttpResponse {
    return {
      statusCode: 400,
      body: error
    };
  }

  static serverError (): IHttpResponse {
    return {
      statusCode: 500,
      body: new ServerError()
    };
  }

  static unauthorizedError (): IHttpResponse {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    };
  }

  static noContent (): IHttpResponse {
    return {
      statusCode: 204,
      body: null
    };
  }

  static notFound (): IHttpResponse {
    return {
      statusCode: 404,
      body: null
    };
  }

  static ok (data: any): IHttpResponse {
    return {
      statusCode: 200,
      body: data
    };
  }

  static created (data: any): IHttpResponse {
    return {
      statusCode: 201,
      body: data
    };
  }
}

export { HttpResponse };
