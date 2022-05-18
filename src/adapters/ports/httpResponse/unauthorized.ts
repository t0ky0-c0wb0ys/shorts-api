import HttpResponse from './httpResponse';

class UnauthorizedError extends HttpResponse {
  constructor() {
    super(401, {
      message: 'Unauthorized',
    });
  }
}

export default UnauthorizedError;
