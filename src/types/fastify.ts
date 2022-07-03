import type {
  FastifyInstance,
  FastifyLoggerInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export type TypeBoxFastifyInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyLoggerInstance,
  TypeBoxTypeProvider
>;
