
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

const instrumentations = [
  ...getNodeAutoInstrumentations(),
  await (async () => {
    // https://github.com/oven-sh/bun/issues/3775#issuecomment-3026955059
    process.release.name = 'bun'
    const { FetchInstrumentation } = await import('@opentelemetry/instrumentation-fetch')
    process.release.name = 'node'

    return new FetchInstrumentation()
  })(),
  // new FetchInstrumentation(),
]

export default instrumentations
