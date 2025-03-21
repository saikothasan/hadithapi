import { type NextRequest, NextResponse } from "next/server"
import { trackApiUsage } from "@/lib/analytics"

export const runtime = "edge"

// Add type interface for the hadith data
interface HadithData {
  hadith: Array<{
    id: number
    header: string
    hadith_english: string
    book: string
    refno: string
    bookName: string
    chapterName: string
  }>
}

export async function GET(request: NextRequest, { params }: { params: { collection: string; id: string } }) {
  const { collection, id } = params
  const idNumber = Number.parseInt(id)

  // Validate collection name
  const validCollections = ["bukhari", "muslim", "abudawud", "ibnmajah", "tirmidhi"]
  if (!validCollections.includes(collection)) {
    trackApiUsage(`/api/${collection}/${id}`, 400)
    return NextResponse.json({ error: "Invalid collection name" }, { status: 400 })
  }

  // Validate ID ranges based on collection
  const maxIds = {
    bukhari: 7563,
    muslim: 3032,
    abudawud: 3998,
    ibnmajah: 4342,
    tirmidhi: 3956,
  }

  if (isNaN(idNumber) || idNumber < 1 || idNumber > maxIds[collection as keyof typeof maxIds]) {
    trackApiUsage(`/api/${collection}/${id}`, 400)
    return NextResponse.json(
      { error: `ID must be between 1 and ${maxIds[collection as keyof typeof maxIds]}` },
      { status: 400 },
    )
  }

  try {
    // Fetch the JSON file
    const response = await fetch(`${new URL(request.url).origin}/${collection}.json`)

    if (!response.ok) {
      trackApiUsage(`/api/${collection}/${id}`, 500)
      return NextResponse.json({ error: "Failed to retrieve hadith collection" }, { status: 500 })
    }

    // Update the fetch response handling with type assertion
    const data = (await response.json()) as HadithData

    // Find the hadith with the matching ID
    const hadith = data.hadith.find((h: any) => h.id === idNumber)

    if (!hadith) {
      trackApiUsage(`/api/${collection}/${id}`, 404)
      return NextResponse.json({ error: "Hadith not found" }, { status: 404 })
    }

    trackApiUsage(`/api/${collection}/${id}`, 200)
    return NextResponse.json(hadith)
  } catch (error) {
    console.error("Error reading hadith:", error)
    trackApiUsage(`/api/${collection}/${id}`, 500)
    return NextResponse.json({ error: "Failed to retrieve hadith" }, { status: 500 })
  }
}

