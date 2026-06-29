import { db } from '@/lib/db'
import { cachedJson } from '@/lib/apiHelpers'
import { modelsQuerySchema } from '@/lib/validations'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const parsed = modelsQuerySchema.safeParse({
    year: searchParams.get('year'),
    make: searchParams.get('make'),
  })
  if (!parsed.success) {
    return Response.json({ error: 'Invalid year or make' }, { status: 400 })
  }

  const rows = await db.vehicle.findMany({
    where:    { year: parsed.data.year, make: parsed.data.make },
    select:   { model: true },
    distinct: ['model'],
    orderBy:  { model: 'asc' },
  })

  return cachedJson(rows.map((r:any) => r.model))
}
