"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Search, BookOpen, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchResult {
  id: number
  hadith_english: string
  refno: string
  book: string
  chapterName: string
  collection: string
}

interface PaginationInfo {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function SearchClientPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [collection, setCollection] = useState(searchParams.get("collection") || "")
  const [results, setResults] = useState<SearchResult[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const page = Number.parseInt(searchParams.get("page") || "1")

  const collections = [
    { value: "", label: "All Collections" },
    { value: "bukhari", label: "Sahih Bukhari" },
    { value: "muslim", label: "Sahih Muslim" },
    { value: "abudawud", label: "Sunan Abu Dawud" },
    { value: "ibnmajah", label: "Sunan Ibn Majah" },
    { value: "tirmidhi", label: "Jami at-Tirmidhi" },
  ]

  const performSearch = async () => {
    if (!query.trim()) {
      setIsInitialLoad(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const searchUrl = new URL("/api/search", window.location.origin)
      searchUrl.searchParams.append("q", query)
      if (collection) searchUrl.searchParams.append("collection", collection)
      searchUrl.searchParams.append("page", page.toString())
      searchUrl.searchParams.append("limit", "10")

      const response = await fetch(searchUrl.toString())

      if (!response.ok) {
        throw new Error("Failed to search hadiths")
      }

      const data = await response.json()
      setResults(data.results)
      setPagination(data.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setResults([])
      setPagination(null)
    } finally {
      setIsLoading(false)
      setIsInitialLoad(false)
    }
  }

  useEffect(() => {
    if (query) {
      performSearch()
    } else {
      setIsInitialLoad(false)
    }
  }, [page, collection])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Update URL with search parameters
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (collection) params.set("collection", collection)
    params.set("page", "1") // Reset to page 1 on new search

    router.push(`/search?${params.toString()}`)
    performSearch()
  }

  const handleCollectionChange = (value: string) => {
    setCollection(value)

    // Update URL with new collection
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("collection", value)
    } else {
      params.delete("collection")
    }
    params.set("page", "1") // Reset to page 1 on collection change

    router.push(`/search?${params.toString()}`)
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-primary">Search Hadiths</h1>

        <div className="p-6 bg-primary/5 rounded-lg border border-primary/10 mb-8 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search for hadiths..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={collection} onValueChange={handleCollectionChange}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Collections" />
              </SelectTrigger>
              <SelectContent>
                {collections.map((col) => (
                  <SelectItem key={col.value} value={col.value}>
                    {col.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
      </div>

      {isInitialLoad ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-24 mt-2" />
                  </div>
                  <Skeleton className="h-9 w-28" />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isLoading ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-24 mt-2" />
                  </div>
                  <Skeleton className="h-9 w-28" />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20 mb-6">
          <h3 className="font-medium mb-2">Error</h3>
          <p>{error}</p>
        </div>
      ) : results.length === 0 && query ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">No results found</h2>
          <p className="text-muted-foreground">
            No results found for "{query}". Try different keywords or browse collections.
          </p>
        </div>
      ) : results.length > 0 ? (
        <>
          <div className="mb-4">
            <p className="text-muted-foreground">
              Showing {((pagination?.page || 1) - 1) * (pagination?.limit || 10) + 1}-
              {Math.min((pagination?.page || 1) * (pagination?.limit || 10), pagination?.total || 0)} of{" "}
              {pagination?.total || 0} results
            </p>
          </div>

          <div className="grid gap-6">
            {results.map((result) => (
              <Card
                key={`${result.collection}-${result.id}`}
                className="overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-md hover:border-primary/20"
              >
                <CardHeader className="bg-primary/5 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-primary" />
                        {collections.find((c) => c.value === result.collection)?.label || result.book} #{result.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{result.refno}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Link href={`/hadith/${result.collection}/${result.id}`}>
                        View Details
                        <ArrowUpRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {result.chapterName && (
                      <div>
                        <h3 className="text-sm font-medium text-primary mb-1">Chapter</h3>
                        <p>{result.chapterName}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-primary mb-1">Hadith</h3>
                      <p className="line-clamp-3">{result.hadith_english}</p>
                      {result.hadith_english.length > 200 && (
                        <Button variant="link" size="sm" asChild className="p-0 h-auto mt-2">
                          <Link href={`/hadith/${result.collection}/${result.id}`}>Read more</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                {pagination.hasPrevPage && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/search?q=${query}${collection ? `&collection=${collection}` : ""}&page=${page - 1}`}
                    />
                  </PaginationItem>
                )}

                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  // Show pages around the current page
                  let pageNum = page - 2 + i
                  if (pageNum < 1) pageNum = i + 1
                  if (pageNum > pagination.totalPages) pageNum = pagination.totalPages - (4 - i)

                  if (pageNum > 0 && pageNum <= pagination.totalPages) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href={`/search?q=${query}${collection ? `&collection=${collection}` : ""}&page=${pageNum}`}
                          isActive={pageNum === page}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  }
                  return null
                })}

                {pagination.hasNextPage && (
                  <PaginationItem>
                    <PaginationNext
                      href={`/search?q=${query}${collection ? `&collection=${collection}` : ""}&page=${page + 1}`}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : null}
    </div>
  )
}

