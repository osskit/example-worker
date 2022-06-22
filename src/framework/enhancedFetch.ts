import fetch from 'node-fetch';
import type { FetchError } from '@osskit/fetch-enhancers';
import { withRetry, withThrow, withTimeout, withHeaders } from '@osskit/fetch-enhancers';
import monitorRetry from './monitorRetry.js';
import { serviceName, serviceVersion } from './environment.js';

const retryOpts = {
  onRetry: (err: Error) => {
    monitorRetry(err as FetchError);
  },
};
const timeoutOpts = { requestTimeoutMs: 10_000 };

const headers = () => ({
  'x-api-client': serviceName,
  'x-api-client-version': serviceVersion,
});

export const enhancedFetch = withThrow(withHeaders(withTimeout(withRetry(fetch, retryOpts), timeoutOpts), headers));
