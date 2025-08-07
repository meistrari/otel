import { otel } from '@hono/otel'

export const instrumentationMiddleware = otel()
