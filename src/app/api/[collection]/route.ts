import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest, { params }: { params: { collection: string } }) {
  const { collection } = params
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  // Validate collection name
  const validCollections = ["bukhari", "muslim", "abudawud", "ibnmajah", "tirmidhi"]
  if (!validCollections.includes(collection)) {
    return NextResponse.json({ error: "Invalid collection name" }, { status: 400 })
  }

  // Validate pagination parameters
  if (isNaN(page) || page < 1) {
    return NextResponse.json({ error: "Page must be a positive integer" }, { status: 400 })
  }

  if (isNaN(limit) || limit < 1 || limit > 100) {
    return NextResponse.json({ error: "Limit must be between 1 and 100" }, { status: 400 })
  }

  try {
    // Fetch the JSON file
    const response = await fetch(`${new URL(request.url).origin}/${collection}.json`)

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to retrieve hadith collection" }, { status: 500 })
    }

    const data = await response.json()

    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const results = data.hadith.slice(startIndex, endIndex)

    // Prepare pagination metadata
    const totalHadiths = data.hadith.length
    const totalPages = Math.ceil(totalHadiths / limit)

    return NextResponse.json({
      results,
      pagination: {
        total: totalHadiths,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Error reading hadiths:", error)
    return NextResponse.json({ error: "Failed to retrieve hadiths" }, { status: 500 })
  }
}

