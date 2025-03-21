import HadithClientPage from "./HadithClientPage"

interface HadithPageProps {
  params: {
    collection: string
    id: string
  }
}

export const runtime = "edge"

// Generate metadata for SEO
export async function generateMetadata({ params }: HadithPageProps) {
  const { collection, id } = params
  const idNumber = Number.parseInt(id)

  // Validate collection name
  const validCollections = {
    bukhari: "Sahih Bukhari",
    muslim: "Sahih Muslim",
    abudawud: "Sunan Abu Dawud",
    ibnmajah: "Sunan Ibn Majah",
    tirmidhi: "Jami at-Tirmidhi",
  }

  if (!Object.keys(validCollections).includes(collection)) {
    return {
      title: "Hadith Not Found",
      description: "The requested hadith could not be found.",
    }
  }

  try {
    // Fetch the JSON file
    const response = await fetch(`https://hadithapi.pages.dev/${collection}.json`)

    if (!response.ok) {
      throw new Error(`Failed to fetch ${collection} collection`)
    }

    // Update the fetch response handling with type assertion in generateMetadata
    const data = (await response.json()) as { hadith: Array<any> }

    // Find the hadith with the matching ID
    const hadith = data.hadith.find((h: any) => h.id === idNumber)

    if (!hadith) {
      return {
        title: "Hadith Not Found",
        description: "The requested hadith could not be found.",
      }
    }

    // Create a short excerpt from the hadith text
    const excerpt =
      hadith.hadith_english.length > 160 ? hadith.hadith_english.substring(0, 157) + "..." : hadith.hadith_english

    return {
      title: `${hadith.refno} - ${hadith.chapterName || "Hadith"}`,
      description: excerpt,
      openGraph: {
        title: `${hadith.refno} - ${hadith.chapterName || "Hadith"}`,
        description: excerpt,
        type: "article",
        url: `https://hadithapi.pages.dev/hadith/${collection}/${id}`,
      },
      twitter: {
        card: "summary",
        title: `${hadith.refno} - ${hadith.chapterName || "Hadith"}`,
        description: excerpt,
      },
    }
  } catch (error) {
    return {
      title: "Error",
      description: "An error occurred while retrieving the hadith.",
    }
  }
}

export default function HadithPage({ params }: HadithPageProps) {
  return <HadithClientPage params={params} />
}

