import 'dotenv/config'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import vehicles from './data/vehicles.json'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log(`Seeding ${vehicles.length} vehicles...`)

  await prisma.vehicle.createMany({
    data: vehicles,
    skipDuplicates: true,
  })

  const count = await prisma.vehicle.count()
  console.log(`Seeding complete. Total vehicles in DB: ${count}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
