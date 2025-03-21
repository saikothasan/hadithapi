"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AdvancedSearchFiltersProps {
  onApplyFilters: (filters: SearchFilters) => void
  initialFilters?: SearchFilters
}

export interface SearchFilters {
  query: string
  collection: string
  exactMatch: boolean
  narrator?: string
  bookName?: string
  chapterName?: string
  excludeTerms?: string
}

export function AdvancedSearchFilters({ onApplyFilters, initialFilters }: AdvancedSearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>(
    initialFilters || {
      query: "",
      collection: "",
      exactMatch: false,
      narrator: "",
      bookName: "",
      chapterName: "",
      excludeTerms: "",
    },
  )

  const [open, setOpen] = useState(false)

  const handleChange = (field: keyof SearchFilters, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    setOpen(false)
  }

  const handleReset = () => {
    const resetFilters = {
      query: filters.query, // Keep the query
      collection: "",
      exactMatch: false,
      narrator: "",
      bookName: "",
      chapterName: "",
      excludeTerms: "",
    }
    setFilters(resetFilters)
    onApplyFilters(resetFilters)
  }

  const hasActiveFilters = () => {
    return (
      filters.collection !== "" ||
      filters.exactMatch ||
      (filters.narrator && filters.narrator !== "") ||
      (filters.bookName && filters.bookName !== "") ||
      (filters.chapterName && filters.chapterName !== "") ||
      (filters.excludeTerms && filters.excludeTerms !== "")
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={hasActiveFilters() ? "default" : "outline"}
          size="sm"
          className={`flex items-center gap-1 ${hasActiveFilters() ? "bg-primary text-primary-foreground" : ""}`}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {hasActiveFilters() && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground text-xs font-medium text-primary">
              {Object.values(filters).filter((v) => v !== "" && v !== false).length - 1}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Advanced Search Filters</SheetTitle>
          <SheetDescription>Refine your search with additional filters</SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="collection">Collection</Label>
            <Select value={filters.collection} onValueChange={(value) => handleChange("collection", value)}>
              <SelectTrigger id="collection">
                <SelectValue placeholder="All Collections" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Collections</SelectItem>
                <SelectItem value="bukhari">Sahih Bukhari</SelectItem>
                <SelectItem value="muslim">Sahih Muslim</SelectItem>
                <SelectItem value="abudawud">Sunan Abu Dawud</SelectItem>
                <SelectItem value="ibnmajah">Sunan Ibn Majah</SelectItem>
                <SelectItem value="tirmidhi">Jami at-Tirmidhi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="exactMatch"
              checked={filters.exactMatch}
              onCheckedChange={(checked) => handleChange("exactMatch", checked === true)}
            />
            <Label htmlFor="exactMatch">Exact phrase match</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="narrator">Narrator contains</Label>
            <Input
              id="narrator"
              placeholder="e.g., Abu Hurairah"
              value={filters.narrator || ""}
              onChange={(e) => handleChange("narrator", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookName">Book name contains</Label>
            <Input
              id="bookName"
              placeholder="e.g., Book of Prayer"
              value={filters.bookName || ""}
              onChange={(e) => handleChange("bookName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chapterName">Chapter name contains</Label>
            <Input
              id="chapterName"
              placeholder="e.g., Fasting"
              value={filters.chapterName || ""}
              onChange={(e) => handleChange("chapterName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excludeTerms">Exclude terms</Label>
            <Input
              id="excludeTerms"
              placeholder="Terms to exclude from results"
              value={filters.excludeTerms || ""}
              onChange={(e) => handleChange("excludeTerms", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Separate multiple terms with commas</p>
          </div>
        </div>

        <SheetFooter className="mt-6 flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
            <X className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
          <Button onClick={handleApply} className="w-full sm:w-auto">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

