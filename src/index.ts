import 'dotenv/config.js';

import { logger } from './framework/logger.js';
import handleDisaster from './framework/handleDisaster.js';
import { port } from './framework/environment.js';
import terminus from './server/plugins/terminus.js';
import { init as initFastify } from './server/index.js';

try {
  const fastify = await initFastify();

  terminus(fastify.server);

  await fastify.listen({ port, host: '0.0.0.0' });
  logger.info({ port }, 'HTTP server is RUNNING!');

  handleDisaster();
} catch (error) {
  logger.error({ err: error }, 'error caught at index');
}
