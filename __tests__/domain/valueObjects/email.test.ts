import faker from '@faker-js/faker';
import Email from '../../../src/domain/valueObjects/email/email';
import InvalidEmailError from '../../../src/domain/errors/invalidEmailError';
import MaxLengthEmailError from '../../../src/domain/errors/maxLengthEmailError';

describe('Email entity', () => {
  it('should not create a email with too much chars', () => {
    const params = {
      email: `${faker.internet.email()}${faker.lorem.paragraph(255)}`,
    };

    const error = Email.create(params.email) as Error;

    expect(error).toBeInstanceOf(MaxLengthEmailError);
    expect(error.message).toBe(new MaxLengthEmailError().message);
  });

  it('should not create a email without the format of an email', () => {
    const params = {
      email: 'invalidEmail',
    };

    const error = Email.create(params.email) as Error;

    expect(error).toBeInstanceOf(InvalidEmailError);
    expect(error.message).toBe(new InvalidEmailError().message);
  });

  it('should create a email', () => {
    const params = {
      email: faker.internet.email(),
    };

    const email = Email.create(params.email) as Email;

    expect(email).toBeInstanceOf(Email);
    expect(email.email).toBe(params.email);
  });
});
