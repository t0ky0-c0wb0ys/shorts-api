import HttpResponse from './httpResponse';

class Ok extends HttpResponse {
  constructor(message: string) {
    super(200, {
      message,
    });
  }
}

export default Ok;
