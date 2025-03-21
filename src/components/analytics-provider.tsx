"use client"

import type React from "react"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // Create URL object with current path and search params
      let url = pathname
      if (searchParams?.toString()) {
        url = `${url}?${searchParams.toString()}`
      }

      // Track page view
      trackPageView(url)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}

