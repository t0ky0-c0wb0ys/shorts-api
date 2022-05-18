import HttpResponse from './httpResponse';

class ServerError extends HttpResponse {
  constructor() {
    super(500, {
      message: 'Internal server error',
    });
  }
}

export default ServerError;
