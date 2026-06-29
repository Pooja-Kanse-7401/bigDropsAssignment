import { db } from '@/lib/db'
import { cachedJson } from '@/lib/apiHelpers'
import { makesQuerySchema } from '@/lib/validations'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const parsed = makesQuerySchema.safeParse({ year: searchParams.get('year') })
  if (!parsed.success) {
    return Response.json({ error: 'Invalid year' }, { status: 400 })
  }

  const rows = await db.vehicle.findMany({
    where:    { year: parsed.data.year },
    select:   { make: true },
    distinct: ['make'],
    orderBy:  { make: 'asc' },
  })

  return cachedJson(rows.map((r:any) => r.make))
}
