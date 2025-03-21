import type { MetadataRoute } from "next"

// Define the collections for generating collection and hadith URLs
const collections = [
  { slug: "bukhari", count: 7563 },
  { slug: "muslim", count: 3032 },
  { slug: "abudawud", count: 3998 },
  { slug: "ibnmajah", count: 4342 },
  { slug: "tirmidhi", count: 3956 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://hadithapi.pages.dev"

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/responsive`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ] as MetadataRoute.Sitemap

  // Collection pages
  const collectionPages = collections.map((collection) => ({
    url: `${baseUrl}/collection/${collection.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  })) as MetadataRoute.Sitemap

  // Generate hadith pages - limit to a reasonable number for each collection
  // In a real implementation, you might want to generate these more selectively
  const hadithPages: MetadataRoute.Sitemap = []

  collections.forEach((collection) => {
    // Add the first 10 hadiths and a selection of others for each collection
    // This is to keep the sitemap from being too large
    const pagesToAdd = [
      ...Array.from({ length: 10 }, (_, i) => i + 1), // First 10
      50,
      100,
      200,
      500,
      1000, // Some key pages
    ].filter((id) => id <= collection.count) // Ensure we don't exceed the collection count

    pagesToAdd.forEach((id) => {
      hadithPages.push({
        url: `${baseUrl}/hadith/${collection.slug}/${id}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.5,
      })
    })
  })

  return [...staticPages, ...collectionPages, ...hadithPages]
}

