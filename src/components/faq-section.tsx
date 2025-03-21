"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
  description?: string
}

export function FAQSection({ faqs, title = "Frequently Asked Questions", description }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary">{title}</h2>
          {description && <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden border-primary/10">
              <CardHeader className="p-0">
                <Button
                  variant="ghost"
                  onClick={() => toggleFAQ(index)}
                  className="w-full justify-between p-6 rounded-none h-auto text-left font-medium"
                >
                  <CardTitle className="text-base">{faq.question}</CardTitle>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CardHeader>
              <CardContent
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "pb-6 max-h-96" : "max-h-0 p-0"
                }`}
              >
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

