import promBundle from 'express-prom-bundle';
import middie from '@fastify/middie';
import type { TypeBoxFastifyInstance } from '../../types/fastify';

export const metrics = async (fastify: TypeBoxFastifyInstance) => {
  await fastify.register(middie);

  fastify.use(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    promBundle({
      includeMethod: true,
      includePath: true,
      customLabels: {
        client: 'unknown',
        version: 'unknown',
      },
      transformLabels: (labels, { headers: { 'x-api-client': clientHeader, 'x-api-client-version': clientVersion } }) => {
        labels.client = clientHeader?.toString() ?? 'unknown';
        labels.version = clientVersion?.toString() ?? 'unknown';
      },
    }) as any,
  );
};
