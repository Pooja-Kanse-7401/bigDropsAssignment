const VEHICLE_CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
}

export function cachedJson(data: unknown, status = 200): Response {
  return Response.json(data, { status, headers: VEHICLE_CACHE_HEADERS })
}
