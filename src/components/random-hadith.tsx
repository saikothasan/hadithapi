"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, RefreshCw, Copy, Share2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { copyToClipboard } from "@/lib/utils"

interface Hadith {
  id: number
  hadith_english: string
  refno: string
  book: string
  chapterName: string
  collection: string
  header?: string
}

export function RandomHadith() {
  const [hadith, setHadith] = useState<Hadith | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchRandomHadith = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Get a random collection
      const collections = ["bukhari", "muslim", "abudawud", "ibnmajah", "tirmidhi"]
      const randomCollection = collections[Math.floor(Math.random() * collections.length)]

      // Get collection data to determine max ID
      const collectionResponse = await fetch(`/api/${randomCollection}?page=1&limit=1`)
      if (!collectionResponse.ok) {
        throw new Error("Failed to fetch collection data")
      }

      const collectionData = await collectionResponse.json()
      const maxId = collectionData.pagination.total

      // Get a random hadith ID
      const randomId = Math.floor(Math.random() * maxId) + 1

      // Fetch the random hadith
      const response = await fetch(`/api/${randomCollection}/${randomId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch random hadith")
      }

      const data = await response.json()
      setHadith({ ...data, collection: randomCollection })
    } catch (err) {
      console.error("Error fetching random hadith:", err)
      setError("Failed to load random hadith. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomHadith()
  }, [])

  const handleCopy = () => {
    if (!hadith) return

    const text = `${hadith.refno}\n\n${hadith.hadith_english}`
    copyToClipboard(text)

    toast({
      title: "Copied to clipboard",
      description: "Hadith text has been copied to your clipboard",
    })
  }

  const handleShare = async () => {
    if (!hadith) return

    const url = `${window.location.origin}/hadith/${hadith.collection}/${hadith.id}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hadith: ${hadith.refno}`,
          text: hadith.hadith_english,
          url: url,
        })
      } catch (err) {
        console.error("Error sharing:", err)
        copyToClipboard(url)
        toast({
          title: "Link copied to clipboard",
          description: "Share link has been copied to your clipboard",
        })
      }
    } else {
      copyToClipboard(url)
      toast({
        title: "Link copied to clipboard",
        description: "Share link has been copied to your clipboard",
      })
    }
  }

  const collectionNames = {
    bukhari: "Sahih Bukhari",
    muslim: "Sahih Muslim",
    abudawud: "Sunan Abu Dawud",
    ibnmajah: "Sunan Ibn Majah",
    tirmidhi: "Jami at-Tirmidhi",
  }

  return (
    <Card className="w-full border-primary/10 shadow-md">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-primary">Random Hadith</CardTitle>
          <Button variant="ghost" size="sm" onClick={fetchRandomHadith} disabled={isLoading} className="h-8 px-2">
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 px-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : error ? (
          <div className="text-destructive py-4">
            <p>{error}</p>
            <Button variant="outline" size="sm" onClick={fetchRandomHadith} className="mt-2">
              Try Again
            </Button>
          </div>
        ) : hadith ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {collectionNames[hadith.collection as keyof typeof collectionNames]} - {hadith.refno}
              </p>
              {hadith.chapterName && <p className="text-base font-medium">{hadith.chapterName}</p>}
            </div>
            <div>
              <p className="text-base leading-relaxed line-clamp-6">{hadith.hadith_english}</p>
              {hadith.hadith_english.length > 300 && (
                <Button variant="link" size="sm" asChild className="p-0 h-auto mt-2">
                  <Link href={`/hadith/${hadith.collection}/${hadith.id}`}>Read more</Link>
                </Button>
              )}
            </div>
          </div>
        ) : null}
      </CardContent>
      {hadith && !isLoading && (
        <CardFooter className="flex justify-between border-t p-4 bg-muted/5">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} className="h-8">
              <Copy className="h-3.5 w-3.5 mr-1" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} className="h-8">
              <Share2 className="h-3.5 w-3.5 mr-1" />
              Share
            </Button>
          </div>
          <Button variant="outline" size="sm" asChild className="h-8">
            <Link href={`/hadith/${hadith.collection}/${hadith.id}`}>
              <BookOpen className="h-3.5 w-3.5 mr-1" />
              View Details
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

