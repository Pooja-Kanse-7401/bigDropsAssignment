import { db } from '@/lib/db'
import { cachedJson } from '@/lib/apiHelpers'

export async function GET() {
  const rows = await db.vehicle.findMany({
    select:   { year: true },
    distinct: ['year'],
    orderBy:  { year: 'desc' },
  })

  return cachedJson(rows.map((r:any) => r.year))
}
