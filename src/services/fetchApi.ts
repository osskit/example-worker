import { createMonitor } from '@osskit/monitor';
import type { ExampleType, UUID } from '../schemas/events.js';
import { enhancedFetch } from '../framework/enhancedFetch.js';
import { apiUrl } from '../framework/environment.js';

const monitor = createMonitor({ scope: 'fetchApi' });

export const updateType = (id: UUID, type: ExampleType) =>
  monitor('updateType', async () => enhancedFetch(apiUrl, { method: 'GET' }), { context: { id, type } });
