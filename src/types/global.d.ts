// Type definitions for Google Analytics
interface Window {
  dataLayer: any[]
  gtag: (
    command: "event" | "config" | "consent" | "set",
    targetId: string,
    params?: {
      [key: string]: any
    },
  ) => void
}

