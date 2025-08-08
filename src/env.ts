import { z } from 'zod'

const env = z.object({
  SERVICE_NAME: z.string(),
  SERVICE_VERSION: z.string(),
  ENVIRONMENT: z.string(),
}).parse(Bun.env)

export default env
