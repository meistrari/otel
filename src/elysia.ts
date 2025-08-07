import { opentelemetry } from '@elysiajs/opentelemetry'

import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'
import { resourceFromAttributes } from '@opentelemetry/resources'
import {
    ATTR_SERVICE_NAME,
    ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions'
import instrumentations from './instrumentations'
import env from './env'

export const instrumentationMiddleware = opentelemetry({
    serviceName: env.SERVICE_NAME,
    traceExporter: new OTLPTraceExporter(),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter(),
    }),
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: env.SERVICE_NAME,
        [ATTR_SERVICE_VERSION]: env.SERVICE_VERSION,
        'deployment.environment.name': env.ENVIRONMENT,
    }),

    instrumentations: [instrumentations],
})
