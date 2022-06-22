import type { TypeBoxFastifyInstance } from '../types/fastify.js';
import { exampleEventPayloadSchema } from '../schemas/events.js';
import { logger } from '../framework/logger.js';
import { updateType } from '../services/fetchApi.js';

export const process = async (fastify: TypeBoxFastifyInstance) => {
  fastify.post(
    '/',
    {
      schema: {
        operationId: 'process',
        body: exampleEventPayloadSchema,
      },
    },
    async ({ body: { example, timestamp } }) => {
      logger.info({ example, timestamp }, 'Received message');
      await updateType(example.id, example.type);
    },
  );
};
