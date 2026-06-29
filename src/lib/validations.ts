import { z } from 'zod'

export const leadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName:  z.string().min(1, 'Last name is required'),
  email:     z.string().email({ message: 'Please enter a valid email address' }),
  phone:     z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Must be US format: (XXX) XXX-XXXX'),
  zipCode:   z.string().regex(/^\d{5}$/, 'ZIP code must be exactly 5 digits'),
  carYear:   z.number().int().min(2010, 'Year must be 2010 or later').max(2024, 'Year must be 2024 or earlier'),
  carMake:   z.string().min(1, 'Please select a make'),
  carModel:  z.string().min(1, 'Please select a model'),
})

export type LeadFormData = z.infer<typeof leadSchema>

export const makesQuerySchema = z.object({
  year: z.coerce.number().int().min(2010).max(2024),
})

export const modelsQuerySchema = z.object({
  year: z.coerce.number().int().min(2010).max(2024),
  make: z.string().min(1),
})
