import { z } from 'zod'

const nameSchema = z.object({
  firstName: z.string(),
  lastName: z.string()
})

const registerDto = z.object({
  name: nameSchema,
  email: z.string().email(),
  password: z.string().min(8),
  employeeID: z.string(),
  role: z.enum(['Inspector', 'Admin']),
  contactNumber: z.string().optional(),
  dateCreated: z.date().default(() => new Date())
})

const loginDto = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type registerDtoType = z.infer<typeof registerDto>
type loginDtoType = z.infer<typeof loginDto>

export { registerDto, loginDto, type registerDtoType, type loginDtoType }
