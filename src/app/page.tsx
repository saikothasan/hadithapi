import Link from "next/link"
import Image from "next/image"
import { Book, Search, Code, Database, BookOpen, ExternalLink, ArrowRight, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Hadith API - Access Authentic Hadith Collections",
  description:
    "Access authentic hadiths from major collections through our simple API or browse them directly. Free and developer-friendly.",
  openGraph: {
    title: "Hadith API - Access Authentic Hadith Collections",
    description:
      "Access authentic hadiths from major collections through our simple API or browse them directly. Free and developer-friendly.",
    url: "https://hadithapi.pages.dev",
    siteName: "Hadith API",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hadith API - Access Authentic Hadith Collections",
    description:
      "Access authentic hadiths from major collections through our simple API or browse them directly. Free and developer-friendly.",
  },
}

export default function Home() {
  const collections = [
    {
      name: "Sahih Bukhari",
      slug: "bukhari",
      count: 7563,
      color: "bg-emerald-50 dark:bg-emerald-950/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      name: "Sahih Muslim",
      slug: "muslim",
      count: 3032,
      color: "bg-blue-50 dark:bg-blue-950/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Sunan Abu Dawud",
      slug: "abudawud",
      count: 3998,
      color: "bg-amber-50 dark:bg-amber-950/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      name: "Sunan Ibn Majah",
      slug: "ibnmajah",
      count: 4342,
      color: "bg-purple-50 dark:bg-purple-950/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      name: "Jami at-Tirmidhi",
      slug: "tirmidhi",
      count: 3956,
      color: "bg-rose-50 dark:bg-rose-950/30",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                <span>Free and Open Source</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
                Authentic Hadiths at Your Fingertips
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Access over 22,000 authentic hadiths from major collections through our simple API or browse them
                directly.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/docs">
                    <Code className="mr-2 h-5 w-5" />
                    API Documentation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/search">
                    <Search className="mr-2 h-5 w-5" />
                    Search Hadiths
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-10 rounded-lg"></div>
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Islamic manuscript"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </section>

      {/* Collections Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary">Hadith Collections</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse authentic hadiths from major collections, carefully preserved and translated.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Card
              key={collection.slug}
              className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg border-primary/10 hover:border-primary/20"
            >
              <CardHeader className={`${collection.color}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-white dark:bg-gray-800 ${collection.iconColor}`}>
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>{collection.name}</CardTitle>
                    <CardDescription>Contains {collection.count.toLocaleString()} hadiths</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Access via API:{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-primary">/api/{collection.slug}/[id]</code>
                </p>
                <p className="text-sm text-muted-foreground">
                  Browse the complete collection or search for specific topics within {collection.name}.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 border-t p-4">
                <Button asChild variant="outline" className="w-full group">
                  <Link href={`/collection/${collection.slug}`}>
                    <Book className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                    Browse
                  </Link>
                </Button>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href={`/search?collection=${collection.slug}`}>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* API Documentation Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary">Developer-Friendly API</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our RESTful API makes it easy to integrate authentic hadiths into your applications, websites, or
                research projects.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Comprehensive Data</h3>
                    <p className="text-muted-foreground">Access over 22,000 hadiths from five major collections.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                    <Code className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Simple Integration</h3>
                    <p className="text-muted-foreground">RESTful endpoints with JSON responses for easy integration.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Powerful Search</h3>
                    <p className="text-muted-foreground">
                      Search across all collections or filter by specific criteria.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/docs">
                    View Documentation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="bg-background rounded-lg border shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-muted-foreground">api-example.js</div>
              </div>
              <pre className="text-sm overflow-x-auto p-4 bg-muted rounded-md">
                <code className="text-foreground">
                  {`// Fetch a specific hadith
async function getHadith(collection, id) {
  const response = await fetch(
    \`https://hadithapi.pages.dev/api/\${collection}/\${id}\`
  );
  return await response.json();
}

// Example usage
const hadith = await getHadith('bukhari', 1);
console.log(hadith.hadith_english);`}
                </code>
              </pre>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" className="text-xs">
                  <Copy className="mr-2 h-3 w-3" />
                  Copy Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary">Why Choose Hadith API</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform offers a range of features designed to make accessing hadith collections simple and efficient.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-primary/10">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <Database className="h-6 w-6" />
              </div>
              <CardTitle>Authentic Sources</CardTitle>
              <CardDescription>
                All hadiths are sourced from authentic collections recognized by Islamic scholars.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <Code className="h-6 w-6" />
              </div>
              <CardTitle>Developer-Friendly</CardTitle>
              <CardDescription>RESTful API with clear documentation and examples for easy integration.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <Search className="h-6 w-6" />
              </div>
              <CardTitle>Powerful Search</CardTitle>
              <CardDescription>
                Search across all collections or filter by specific criteria to find relevant hadiths.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle>Complete Collections</CardTitle>
              <CardDescription>Access five major hadith collections with over 22,000 hadiths in total.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <ExternalLink className="h-6 w-6" />
              </div>
              <CardTitle>Open Source</CardTitle>
              <CardDescription>
                Our platform is open source, allowing for community contributions and transparency.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <Book className="h-6 w-6" />
              </div>
              <CardTitle>Detailed Metadata</CardTitle>
              <CardDescription>
                Each hadith includes detailed metadata such as narration chains and chapter information.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Start Exploring Hadiths Today</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Whether you're a developer, researcher, or simply seeking knowledge, our platform provides easy access to
            authentic hadiths.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/docs">
                <Code className="mr-2 h-5 w-5" />
                API Documentation
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" />
                Search Hadiths
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://hadithapi.pages.dev",
            name: "Hadith API",
            description:
              "Access authentic hadiths from major collections through our simple API or browse them directly.",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://hadithapi.pages.dev/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </main>
  )
}

