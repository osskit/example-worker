import fastifyHelmet from '@fastify/helmet';
import type { TypeBoxFastifyInstance } from '../../types/fastify.js';

export const helmet = async (fastify: TypeBoxFastifyInstance) => {
  await fastify.register(fastifyHelmet);
};
