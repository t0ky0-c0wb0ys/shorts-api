import HttpResponse from './httpResponse';

class BadRequest extends HttpResponse {
  constructor(message: string) {
    super(400, {
      message,
    });
  }
}

export default BadRequest;
