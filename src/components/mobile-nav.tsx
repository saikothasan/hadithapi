"use client"

import { useState } from "react"
import Link from "next/link"
import { Book, Code, Search, Menu, Github, Home, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b pb-4">
            <Link href="/" className="font-bold text-xl flex items-center text-primary" onClick={() => setOpen(false)}>
              <Book className="h-5 w-5 mr-2" />
              Hadith API
            </Link>
            <ModeToggle />
          </div>
          <nav className="flex-1 py-8">
            <div className="mb-4">
              <div className="text-sm font-medium text-muted-foreground mb-2">Navigation</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="flex items-center py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search"
                    className="flex items-center py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="flex items-center py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="flex items-center py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <div className="text-sm font-medium text-muted-foreground mb-2">Collections</div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/collection/bukhari"
                    className="flex items-center py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Sahih Bukhari
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collection/muslim"
                    className="flex items-center py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Sahih Muslim
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collection/abudawud"
                    className="flex items-center py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Sunan Abu Dawud
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collection/ibnmajah"
                    className="flex items-center py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Sunan Ibn Majah
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collection/tirmidhi"
                    className="flex items-center py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Jami at-Tirmidhi
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="border-t pt-4">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link
                href="https://github.com/yourusername/hadith-api"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub Repository
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

