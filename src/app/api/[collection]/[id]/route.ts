import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const runtime = "edge"

export async function GET(request: NextRequest, { params }: { params: { collection: string; id: string } }) {
  const { collection, id } = params
  const idNumber = Number.parseInt(id)

  // Validate collection name
  const validCollections = ["bukhari", "muslim", "abudawud", "ibnmajah", "tirmidhi"]
  if (!validCollections.includes(collection)) {
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
    return NextResponse.json(
      { error: `ID must be between 1 and ${maxIds[collection as keyof typeof maxIds]}` },
      { status: 400 },
    )
  }

  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), "public", `${collection}.json`)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(fileContents)

    // Find the hadith with the matching ID
    const hadith = data.hadith.find((h: any) => h.id === idNumber)

    if (!hadith) {
      return NextResponse.json({ error: "Hadith not found" }, { status: 404 })
    }

    return NextResponse.json(hadith)
  } catch (error) {
    console.error("Error reading hadith:", error)
    return NextResponse.json({ error: "Failed to retrieve hadith" }, { status: 500 })
  }
}

