import HttpResponse from './httpResponse';

class Created extends HttpResponse {
  constructor(body: unknown) {
    super(201, body);
  }
}

export default Created;
