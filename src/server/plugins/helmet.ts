import fastifyHelmet from '@fastify/helmet';
import type { TypeBoxFastifyInstance } from '../../types/fastify';

export const helmet = async (fastify: TypeBoxFastifyInstance) => {
  await fastify.register(fastifyHelmet);
};
