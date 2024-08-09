import { z } from 'zod'

const startReportDto = z.object({
  name: z.string(),
  location: z.string()
})

type startReportDtoType = z.infer<typeof startReportDto>

export { startReportDto, type startReportDtoType }
