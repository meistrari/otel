// https://github.com/oven-sh/bun/issues/3775#issuecomment-3026955059
process.release.name = 'bun'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
process.release.name = 'node'

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

const instrumentations = [
  ...getNodeAutoInstrumentations(),
  new FetchInstrumentation(),
]

export default instrumentations
