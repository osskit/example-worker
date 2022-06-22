import fetch from 'node-fetch';
import { reset, createMapping, HttpMethod, hasMadeCalls } from '@osskit/wiremock-client';
import { v4 as uuid } from 'uuid';

export const createFetchMapping = () =>
  createMapping({
    request: {
      method: HttpMethod.Get,
      urlPathPattern: '/',
    },
    response: {
      status: 204,
    },
  });

const sendMessage = async (id: string, type: string, name: string, status = 200) => {
  const res = await fetch('http://localhost:3000/', {
    method: 'POST',
    body: JSON.stringify({
      example: { id, type, name },
      timestamp: Date.now(),
    }),
    headers: { 'Content-Type': 'application/json', 'x-api-client': 'client', 'x-api-client-version': '1' },
  });

  expect(res.ok).toBeTruthy();
  expect(res.status).toBe(status);
};

describe('tests', () => {
  beforeEach(async () => {
    await reset();
  });

  it('receive event and fetch', async () => {
    const mapping = await createFetchMapping();

    await sendMessage(uuid(), 'a', 'name');

    const res = await hasMadeCalls(mapping);
    expect(res).toBeTruthy();
  });
});
