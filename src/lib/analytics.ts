// This file provides utility functions for tracking events with Google Analytics

type EventParams = {
  action: string
  category: string
  label?: string
  value?: number
  [key: string]: any
}

// Track a custom event
export const trackEvent = ({ action, category, label, value, ...rest }: EventParams) => {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    ;(window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    })
  }
}

// Track a page view
export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    ;(window as any).gtag("config", "G-XXXXXXXXXX", {
      page_path: url,
    })
  }
}

// Track a search query
export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent({
    action: "search",
    category: "Search",
    label: query,
    value: resultsCount,
  })
}

// Track hadith view
export const trackHadithView = (collection: string, id: number) => {
  trackEvent({
    action: "view_hadith",
    category: "Hadith",
    label: `${collection}/${id}`,
  })
}

// Track API usage
export const trackApiUsage = (endpoint: string, status: number) => {
  trackEvent({
    action: "api_request",
    category: "API",
    label: endpoint,
    value: status,
  })
}

