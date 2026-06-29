import { db } from '@/lib/db'
import { leadSchema } from '@/lib/validations'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = leadSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { error: 'Validation failed', fields: parsed.error.flatten().fieldErrors },
        { status: 422 }
      )
    }

    const { firstName, lastName, email, phone, zipCode, carYear, carMake, carModel } = parsed.data

    const vehicleExists = await db.vehicle.findUnique({
      where: { year_make_model: { year: carYear, make: carMake, model: carModel } },
    })
    if (!vehicleExists) {
      return Response.json(
        { error: 'Invalid vehicle combination' },
        { status: 422 }
      )
    }

    await db.lead.create({
      data: { firstName, lastName, email, phone, zipCode, carYear, carMake, carModel },
    })

    return Response.json({ success: true }, { status: 201 })
  } catch {
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
