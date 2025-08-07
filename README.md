# @meistrari/otel

A lightweight OpenTelemetry library for Node.js applications with built-in support for Hono and Elysia frameworks.

## Features

- 🚀 Easy setup with minimal configuration
- 📊 Automatic instrumentation for Node.js applications
- 🔥 Built-in support for Hono and Elysia frameworks
- 📈 OTLP HTTP exporters for traces and metrics
- 🌍 Environment-based configuration
- 🎯 TypeScript support

## Installation

```bash
npm install @meistrari/otel
```

### Peer Dependencies

For framework-specific usage, install the corresponding peer dependencies:

```bash
# For Hono
npm install @hono/otel

# For Elysia
npm install @elysiajs/opentelemetry
```

## Environment Variables

Set the following environment variables:

```bash
SERVICE_NAME=my-service
SERVICE_VERSION=1.0.0
ENVIRONMENT=production
```

## Usage

### Basic Bun Application

For Bun applications, you can use the `bunfig.toml` configuration file to automatically preload the library:

Create a `bunfig.toml` file in your project root:

```toml
preload = [ "@meistrari/otel" ]
```

Then simply run your application:

```bash
# Set environment variables
export SERVICE_NAME=my-bun-app
export SERVICE_VERSION=1.0.0
export ENVIRONMENT=production

# Run with automatic preload
bun run server.ts
```

Alternatively, you can use the command line preload option:

```bash
bun --preload @meistrari/otel server.ts
```

### Hono Integration

#### Using with Preload Script

```bash
# Set environment variables
export SERVICE_NAME=my-hono-app
export SERVICE_VERSION=1.0.0
export ENVIRONMENT=production

# Start with preload
bun --preload @meistrari/otel server.js
```

Then add the Hono middleware in your app:

```typescript
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import honoOtel from '@meistrari/otel/hono'

const app = new Hono()

// Apply OpenTelemetry middleware
app.use('*', honoOtel)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/users/:id', async (c) => {
  const id = c.req.param('id')
  // This will be automatically traced
  const user = await getUserById(id)
  return c.json(user)
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
```

### Elysia Integration

#### Using with Preload Script

```bash
# Set environment variables
export SERVICE_NAME=my-elysia-app
export SERVICE_VERSION=1.0.0
export ENVIRONMENT=production

# Start with preload
bun --preload @meistrari/otel server.ts
```

Then add the Elysia middleware in your app:

```typescript
import { Elysia } from 'elysia'
import { instrumentationMiddleware } from '@meistrari/otel/elysia'

const app = new Elysia()
  // Apply OpenTelemetry middleware
  .use(instrumentationMiddleware)
  .get('/', () => 'Hello Elysia!')
  .get('/users/:id', async ({ params: { id } }) => {
    // This will be automatically traced
    const user = await getUserById(id)
    return user
  })
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
```

## Advanced Configuration

### Custom OTLP Endpoints

Set these environment variables to customize OTLP endpoints:

```bash
OTEL_EXPORTER_OTLP_ENDPOINT=https://your-otlp-endpoint.com
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=https://your-traces-endpoint.com
OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=https://your-metrics-endpoint.com
```

## Troubleshooting

### Common Issues

1. **Missing environment variables**: Ensure `SERVICE_NAME`, `SERVICE_VERSION`, and `ENVIRONMENT` are set.

2. **Instrumentation not working**: Make sure to import `@meistrari/otel` at the very top of your application or use the preload script.
