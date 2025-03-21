import type { Metadata } from "next"
import { FAQSection } from "@/components/faq-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Frequently Asked Questions - Hadith API",
  description: "Find answers to common questions about the Hadith API, its usage, and features.",
}

export default function FAQPage() {
  const faqs = [
    {
      question: "What is the Hadith API?",
      answer:
        "The Hadith API is a RESTful API that provides programmatic access to authentic hadith collections. It allows developers to integrate hadiths into their applications, websites, or research projects.",
    },
    {
      question: "Which hadith collections are available?",
      answer:
        "We currently offer five major hadith collections: Sahih Bukhari, Sahih Muslim, Sunan Abu Dawud, Sunan Ibn Majah, and Jami at-Tirmidhi, with over 22,000 hadiths in total.",
    },
    {
      question: "Is the API free to use?",
      answer:
        "Yes, the API is free to use for non-commercial purposes. We ask that you include proper attribution when using our data and respect the rate limits.",
    },
    {
      question: "Can I use this API in my commercial application?",
      answer:
        "For commercial use, please contact us to discuss licensing options. We offer flexible plans for businesses and commercial applications.",
    },
    {
      question: "Are the hadiths available in other languages?",
      answer:
        "Currently, we only provide English translations. We plan to add Arabic text and translations in other languages in the future.",
    },
    {
      question: "How accurate are the translations?",
      answer:
        "The translations are sourced from respected scholarly works. However, no translation can perfectly capture the original meaning. For critical research, we recommend consulting the original Arabic texts.",
    },
    {
      question: "Is there a rate limit for API requests?",
      answer:
        "Yes, we limit requests to 100 per hour per IP address to ensure fair usage and server stability. If you need higher limits, please contact us.",
    },
    {
      question: "How can I search for specific hadiths?",
      answer:
        "You can use our search endpoint (/api/search) with various parameters to find hadiths by keywords, collection, narrator, and more. See our API documentation for details.",
    },
    {
      question: "Do you provide authentication for the API?",
      answer:
        "Currently, the API is open and does not require authentication. We may introduce API keys for higher rate limits and additional features in the future.",
    },
    {
      question: "How can I report issues or suggest improvements?",
      answer:
        "You can report issues or suggest improvements by opening an issue on our GitHub repository or contacting our support team directly.",
    },
    {
      question: "How can I contribute to this project?",
      answer:
        "We welcome contributions! You can contribute by improving the code, adding new features, fixing bugs, or helping with documentation. Visit our GitHub repository to get started.",
    },
    {
      question: "Is there a way to download the entire dataset?",
      answer:
        "We don't currently offer bulk downloads of the entire dataset. However, you can use our API to retrieve all hadiths programmatically.",
    },
  ]

  return (
    <div>
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-primary">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Find answers to common questions about the Hadith API, its usage, and features.
          </p>
        </div>
      </div>

      <FAQSection faqs={faqs} title="Common Questions" description="Everything you need to know about the Hadith API" />

      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          If you couldn't find the answer to your question, feel free to contact our support team or check our
          documentation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/docs">View Documentation</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:support@hadithapi.example.com">Contact Support</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

