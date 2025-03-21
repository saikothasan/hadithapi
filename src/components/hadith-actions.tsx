"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Share2, Download, Bookmark, BookmarkCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { copyToClipboard } from "@/lib/utils"

interface HadithActionsProps {
  hadith: {
    id: number
    collection: string
    refno: string
    hadith_english: string
    chapterName?: string
  }
}

export function HadithActions({ hadith }: HadithActionsProps) {
  const [isSaved, setIsSaved] = useState(false)
  const { toast } = useToast()

  const handleCopy = () => {
    const text = `${hadith.refno}\n\n${hadith.hadith_english}`
    copyToClipboard(text)

    toast({
      title: "Copied to clipboard",
      description: "Hadith text has been copied to your clipboard",
    })
  }

  const handleShare = async () => {
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

  const handleDownload = () => {
    const title = hadith.chapterName ? `${hadith.refno} - ${hadith.chapterName}` : hadith.refno
    const content = `${title}\n\n${hadith.hadith_english}\n\nSource: ${window.location.origin}/hadith/${hadith.collection}/${hadith.id}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `hadith-${hadith.collection}-${hadith.id}.txt`
    document.body.appendChild(a)
    a.click()

    URL.revokeObjectURL(url)
    document.body.removeChild(a)

    toast({
      title: "Downloaded",
      description: "Hadith has been downloaded as a text file",
    })
  }

  const handleSave = () => {
    // In a real app, this would save to a database or localStorage
    setIsSaved(!isSaved)

    toast({
      title: isSaved ? "Removed from favorites" : "Saved to favorites",
      description: isSaved ? "Hadith has been removed from your favorites" : "Hadith has been added to your favorites",
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-1.5 h-9">
        <Copy className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Copy</span>
      </Button>

      <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-1.5 h-9">
        <Share2 className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Share</span>
      </Button>

      <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center gap-1.5 h-9">
        <Download className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Download</span>
      </Button>

      <Button
        variant={isSaved ? "default" : "outline"}
        size="sm"
        onClick={handleSave}
        className={`flex items-center gap-1.5 h-9 ${isSaved ? "bg-primary text-primary-foreground" : ""}`}
      >
        {isSaved ? (
          <>
            <BookmarkCheck className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Saved</span>
          </>
        ) : (
          <>
            <Bookmark className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Save</span>
          </>
        )}
      </Button>
    </div>
  )
}

