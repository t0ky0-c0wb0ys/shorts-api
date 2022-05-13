import HttpResponse from './httpResponse';

class Ok extends HttpResponse {
  constructor(body: unknown) {
    super(200, body);
  }
}

export default Ok;
