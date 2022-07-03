import { fastify } from 'fastify';
import fastifyCors from '@fastify/cors';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { enforceHeaders } from '@osskit/fastify-enforce-headers';
import { logger } from '../framework/logger.js';
import { trace } from './plugins/tracing.js';
import { helmet } from './plugins/helmet.js';
import { metrics } from './plugins/metrics.js';
import { registerSchemas } from './register-schemas.js';
import { process } from './process.js';

const server = fastify({
  logger,
  ajv: {
    customOptions: {
      coerceTypes: 'array',
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

export const init = async () => {
  registerSchemas(server);

  await trace(server);
  await metrics(server);
  await server.register(enforceHeaders);
  await server.register(fastifyCors);
  await helmet(server);

  await server.register(process);

  return server;
};
