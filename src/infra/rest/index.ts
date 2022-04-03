import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';

const server: FastifyInstance = Fastify({ logger: true });

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
        },
      },
    },
  },
};

server.get('/register', opts, async (request, reply) => {
  return reply.send({ username: 'test' });
});

const start = async () => {
  try {
    const PORT = 3000;
    await server.listen(PORT);

    console.log(`Server is listening on PORT: ${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
