import Link from "next/link"
import Image from "next/image"
import { Book, Search, Code, Database, BookOpen, ExternalLink, ArrowRight, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RandomHadith } from "@/components/random-hadith"

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
        <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                <span>Free and Open Source</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary">
                Authentic Hadiths at Your Fingertips
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Access over 22,000 authentic hadiths from major collections through our simple API or browse them
                directly.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="text-sm md:text-base" asChild>
                  <Link href="/docs">
                    <Code className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    API Documentation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-sm md:text-base" asChild>
                  <Link href="/search">
                    <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Search Hadiths
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" className="text-sm md:text-base" asChild>
                  <a href="https://t.me/drkingbd" target="_blank" rel="noopener noreferrer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 md:h-5 md:w-5"
                    >
                      <path d="M21.73 2.27a2 2 0 0 0-2.83 0L2.27 18.9a2 2 0 0 0 0 2.83l.06.06a2 2 0 0 0 2.83 0L21.73 5.1a2 2 0 0 0 0-2.83Z"></path>
                      <path d="M8.5 8.5 17 17"></path>
                      <path d="M17.5 6.5 6.5 17.5"></path>
                    </svg>
                    Join our Telegram
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-10 rounded-lg"></div>
              <Image
                src="/10521351.png?height=500&width=600"
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

      {/* Random Hadith Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-primary">Hadith of the Moment</h2>
          <p className="text-muted-foreground">Discover wisdom from authentic hadith collections</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <RandomHadith />
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-12 md:py-16 container mx-auto px-4 bg-muted/20">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 md:mb-4 text-primary">
            Hadith Collections
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse authentic hadiths from major collections, carefully preserved and translated.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Card
              key={collection.slug}
              className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg border-primary/10 hover:border-primary/20"
            >
              <CardHeader className={`${collection.color} p-4 md:p-6`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-white dark:bg-gray-800 ${collection.iconColor}`}>
                    <BookOpen className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base md:text-lg">{collection.name}</CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      Contains {collection.count.toLocaleString()} hadiths
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-4 md:pt-6 text-sm md:text-base">
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  Access via API:{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-primary">/api/{collection.slug}/[id]</code>
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Browse the complete collection or search for specific topics within {collection.name}.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 border-t p-3 md:p-4">
                <Button asChild variant="outline" className="w-full text-xs md:text-sm group h-8 md:h-9">
                  <Link href={`/collection/${collection.slug}`}>
                    <Book className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 group-hover:text-primary transition-colors" />
                    Browse
                  </Link>
                </Button>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-xs md:text-sm h-8 md:h-9">
                  <Link href={`/search?collection=${collection.slug}`}>
                    <Search className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Search
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* API Documentation Section */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 md:mb-4 text-primary">
                Developer-Friendly API
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                Our RESTful API makes it easy to integrate authentic hadiths into your applications, websites, or
                research projects.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 md:p-2 rounded-full bg-primary/10 text-primary mt-1">
                    <Database className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-medium">Comprehensive Data</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Access over 22,000 hadiths from five major collections.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 md:p-2 rounded-full bg-primary/10 text-primary mt-1">
                    <Code className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-medium">Simple Integration</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      RESTful endpoints with JSON responses for easy integration.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 md:p-2 rounded-full bg-primary/10 text-primary mt-1">
                    <Search className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-medium">Powerful Search</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Search across all collections or filter by specific criteria.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-8">
                <Button asChild size="lg" className="text-sm md:text-base">
                  <Link href="/docs">
                    View Documentation
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="bg-background rounded-lg border shadow-lg p-4 md:p-6">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-muted-foreground">api-example.js</div>
              </div>
              <pre className="text-xs md:text-sm overflow-x-auto p-3 md:p-4 bg-muted rounded-md">
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
              <div className="mt-3 md:mt-4 flex justify-end">
                <Button variant="outline" size="sm" className="text-xs h-7 md:h-8">
                  <Copy className="mr-1 md:mr-2 h-3 w-3" />
                  Copy Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 md:mb-4 text-primary">
            Why Choose Hadith API
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform offers a range of features designed to make accessing hadith collections simple and efficient.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-primary/10">
            <CardHeader className="p-4 md:p-6">
              <div className="p-1.5 md:p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <Database className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <CardTitle className="text-base md:text-lg">Authentic Sources</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                All hadiths are sourced from authentic collections recognized by Islamic scholars.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10">
            <CardHeader className="p-4 md:p-6">
              <div className="p-1.5 md:p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <Code className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <CardTitle className="text-base md:text-lg">Developer-Friendly</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                RESTful API with clear documentation and examples for easy integration.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10">
            <CardHeader className="p-4 md:p-6">
              <div className="p-1.5 md:p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <Search className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <CardTitle className="text-base md:text-lg">Powerful Search</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Search across all collections or filter by specific criteria to find relevant hadiths.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10">
            <CardHeader className="p-4 md:p-6">
              <div className="p-1.5 md:p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <CardTitle className="text-base md:text-lg">Complete Collections</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Access five major hadith collections with over 22,000 hadiths in total.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10">
            <CardHeader className="p-4 md:p-6">
              <div className="p-1.5 md:p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <ExternalLink className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <CardTitle className="text-base md:text-lg">Open Source</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Our platform is open source, allowing for community contributions and transparency.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10">
            <CardHeader className="p-4 md:p-6">
              <div className="p-1.5 md:p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <Book className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <CardTitle className="text-base md:text-lg">Detailed Metadata</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Each hadith includes detailed metadata such as narration chains and chapter information.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 md:mb-4">Start Exploring Hadiths Today</h2>
          <p className="text-base md:text-xl opacity-90 max-w-2xl mx-auto mb-6 md:mb-8">
            Whether you're a developer, researcher, or simply seeking knowledge, our platform provides easy access to
            authentic hadiths.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <Button size="lg" variant="secondary" className="text-sm md:text-base" asChild>
              <Link href="/docs">
                <Code className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
                API Documentation
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-sm md:text-base bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/search">
                <Search className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
                Search Hadiths
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-sm md:text-base bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <a href="https://t.me/drkingbd" target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5"
                >
                  <path d="M21.73 2.27a2 2 0 0 0-2.83 0L2.27 18.9a2 2 0 0 0 0 2.83l.06.06a2 2 0 0 0 2.83 0L21.73 5.1a2 2 0 0 0 0-2.83Z"></path>
                  <path d="M8.5 8.5 17 17"></path>
                  <path d="M17.5 6.5 6.5 17.5"></path>
                </svg>
                Join Telegram
              </a>
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

