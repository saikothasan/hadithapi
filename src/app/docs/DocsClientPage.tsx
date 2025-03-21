"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"
import { copyToClipboard } from "@/lib/utils"

export default function DocsClientPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">API Documentation</h1>
            <p className="text-xl text-muted-foreground">Learn how to integrate Hadith API into your applications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/saikothasan/hadithapi" target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
            </Button>
            <Button size="sm">Get API Key</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden md:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-medium mb-2">Getting Started</h3>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="#introduction"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Introduction
                    </a>
                  </li>
                  <li>
                    <a
                      href="#authentication"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Authentication
                    </a>
                  </li>
                  <li>
                    <a
                      href="#rate-limiting"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Rate Limiting
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Endpoints</h3>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="#get-hadith"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Get a Specific Hadith
                    </a>
                  </li>
                  <li>
                    <a
                      href="#get-multiple"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Get Multiple Hadiths
                    </a>
                  </li>
                  <li>
                    <a href="#search" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Search Hadiths
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Resources</h3>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="#error-handling"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Error Handling
                    </a>
                  </li>
                  <li>
                    <a href="#examples" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Code Examples
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Introduction */}
            <section id="introduction">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to the Hadith API documentation. This guide will help you understand how to use our API to
                access hadith collections programmatically. Our API provides access to five major hadith collections
                with over 22,000 hadiths.
              </p>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Base URL</CardTitle>
                  <CardDescription>All API requests should be made to this URL</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-3 rounded-md flex justify-between items-center">
                    <code className="text-sm font-mono">https://hadithapi.pages.dev/api</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        copyToClipboard("https://hadithapi.pages.dev/api")
                        // In a real implementation, you'd show a toast notification here
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-xl font-semibold mb-3">Available Collections</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Sahih Bukhari</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">7,563 hadiths</p>
                    <Badge variant="outline" className="mt-2">
                      bukhari
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Sahih Muslim</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">3,032 hadiths</p>
                    <Badge variant="outline" className="mt-2">
                      muslim
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Sunan Abu Dawud</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">3,998 hadiths</p>
                    <Badge variant="outline" className="mt-2">
                      abudawud
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Sunan Ibn Majah</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">4,342 hadiths</p>
                    <Badge variant="outline" className="mt-2">
                      ibnmajah
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Jami at-Tirmidhi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">3,956 hadiths</p>
                    <Badge variant="outline" className="mt-2">
                      tirmidhi
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            {/* Authentication */}
            <section id="authentication">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Authentication</h2>
              <p className="text-muted-foreground mb-4">
                Currently, the API is open and does not require authentication. However, we implement rate limiting to
                prevent abuse. In the future, we may introduce API keys for higher rate limits and additional features.
              </p>
            </section>

            <Separator />

            {/* Rate Limiting */}
            <section id="rate-limiting">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Rate Limiting</h2>
              <p className="text-muted-foreground mb-4">
                To ensure fair usage, we limit requests to 100 per hour per IP address. If you exceed this limit, you'll
                receive a 429 Too Many Requests response.
              </p>
              <Card className="mb-6 border-amber-200 dark:border-amber-800">
                <CardHeader className="bg-amber-50 dark:bg-amber-950/30">
                  <CardTitle className="text-amber-800 dark:text-amber-400 text-base">Rate Limit Headers</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm mb-3">The API includes the following headers in responses:</p>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">X-RateLimit-Limit</code>: Maximum number of
                      requests allowed per hour
                    </li>
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">X-RateLimit-Remaining</code>: Number of requests
                      remaining in the current period
                    </li>
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">X-RateLimit-Reset</code>: Time when the rate limit
                      will reset (Unix timestamp)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Endpoints */}
            <section id="get-hadith">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Get a Specific Hadith</h2>
              <p className="text-muted-foreground mb-4">Retrieves a specific hadith by its ID from a collection.</p>

              <Card className="mb-6">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary text-primary-foreground">GET</Badge>
                    <CardTitle className="text-base font-mono ml-2">
                      /api/{"{collection}"}/{"{id}"}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Path Parameters</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">collection</code>: The name of the hadith
                      collection (bukhari, muslim, abudawud, ibnmajah, tirmidhi)
                    </li>
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">id</code>: The ID of the hadith within the
                      collection
                    </li>
                  </ul>

                  <Tabs defaultValue="request">
                    <TabsList className="mb-2">
                      <TabsTrigger value="request">Example Request</TabsTrigger>
                      <TabsTrigger value="response">Example Response</TabsTrigger>
                    </TabsList>
                    <TabsContent value="request">
                      <div className="bg-muted p-3 rounded-md">
                        <code className="text-sm font-mono">GET /api/bukhari/1</code>
                      </div>
                    </TabsContent>
                    <TabsContent value="response">
                      <div className="bg-muted p-3 rounded-md overflow-x-auto">
                        <pre className="text-sm font-mono">
                          {`{
  "id": 1,
  "header": "Narrated by...",
  "hadith_english": "The hadith text...",
  "book": "Sahih Bukhari",
  "refno": "Bukhari 1",
  "bookName": "Book of Revelation",
  "chapterName": "How the Divine Revelation started"
}`}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section id="get-multiple">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Get Multiple Hadiths</h2>
              <p className="text-muted-foreground mb-4">
                Retrieves multiple hadiths from a collection with pagination.
              </p>

              <Card className="mb-6">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary text-primary-foreground">GET</Badge>
                    <CardTitle className="text-base font-mono ml-2">
                      /api/{"{collection}"}?page={"{page}"}&limit={"{limit}"}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Path Parameters</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">collection</code>: The name of the hadith
                      collection
                    </li>
                  </ul>

                  <h4 className="font-medium mb-2">Query Parameters</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">page</code>: The page number (default: 1)
                    </li>
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">limit</code>: The number of hadiths per page
                      (default: 10, max: 100)
                    </li>
                  </ul>

                  <Tabs defaultValue="request">
                    <TabsList className="mb-2">
                      <TabsTrigger value="request">Example Request</TabsTrigger>
                      <TabsTrigger value="response">Example Response</TabsTrigger>
                    </TabsList>
                    <TabsContent value="request">
                      <div className="bg-muted p-3 rounded-md">
                        <code className="text-sm font-mono">GET /api/muslim?page=1&limit=10</code>
                      </div>
                    </TabsContent>
                    <TabsContent value="response">
                      <div className="bg-muted p-3 rounded-md overflow-x-auto">
                        <pre className="text-sm font-mono">
                          {`{
  "results": [
    {
      "id": 1,
      "header": "...",
      "hadith_english": "...",
      "book": "Sahih Muslim",
      "refno": "Muslim 1",
      "bookName": "Introduction",
      "chapterName": "..."
    },
    // More hadiths...
  ],
  "pagination": {
    "total": 3032,
    "page": 1,
    "limit": 10,
    "totalPages": 304,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}`}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section id="search">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Search Hadiths</h2>
              <p className="text-muted-foreground mb-4">Searches for hadiths containing the specified query.</p>

              <Card className="mb-6">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary text-primary-foreground">GET</Badge>
                    <CardTitle className="text-base font-mono ml-2 text-sm sm:text-base">
                      /api/search?q={"{query}"}&collection={"{collection}"}&page={"{page}"}&limit={"{limit}"}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Query Parameters</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">q</code>: The search query (required)
                    </li>
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">collection</code>: The name of the hadith
                      collection (optional)
                    </li>
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">page</code>: The page number (default: 1)
                    </li>
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">limit</code>: The number of hadiths per page
                      (default: 10, max: 100)
                    </li>
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">exact</code>: Whether to perform an exact phrase
                      match (default: false)
                    </li>
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">narrator</code>: Filter by narrator name (optional)
                    </li>
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">bookName</code>: Filter by book name (optional)
                    </li>
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">chapterName</code>: Filter by chapter name
                      (optional)
                    </li>
                    <li>
                      <code className="bg-muted px-1 py-0.5 rounded">exclude</code>: Terms to exclude from results,
                      comma-separated (optional)
                    </li>
                  </ul>

                  <Tabs defaultValue="request">
                    <TabsList className="mb-2">
                      <TabsTrigger value="request">Example Request</TabsTrigger>
                      <TabsTrigger value="response">Example Response</TabsTrigger>
                    </TabsList>
                    <TabsContent value="request">
                      <div className="bg-muted p-3 rounded-md">
                        <code className="text-sm font-mono">
                          GET /api/search?q=prayer&collection=bukhari&page=1&limit=10
                        </code>
                      </div>
                    </TabsContent>
                    <TabsContent value="response">
                      <div className="bg-muted p-3 rounded-md overflow-x-auto">
                        <pre className="text-sm font-mono">
                          {`{
  "results": [
    {
      "id": 528,
      "header": "...",
      "hadith_english": "... prayer ...",
      "book": "Sahih Bukhari",
      "refno": "Bukhari 528",
      "bookName": "Book of Prayer",
      "chapterName": "...",
      "collection": "bukhari"
    },
    // More hadiths...
  ],
  "pagination": {
    "total": 245,
    "page": 1,
    "limit": 10,
    "totalPages": 25,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}`}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section id="error-handling">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Error Handling</h2>
              <p className="text-muted-foreground mb-4">
                The API uses standard HTTP status codes to indicate the success or failure of a request.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">200 OK</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">The request was successful</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">400 Bad Request</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">The request was invalid</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">404 Not Found</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">The requested resource was not found</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">429 Too Many Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Rate limit exceeded</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">500 Internal Server Error</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">An error occurred on the server</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Error Response Format</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-3 rounded-md overflow-x-auto">
                    <pre className="text-sm font-mono">
                      {`{
  "error": "Error message"
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section id="examples">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Code Examples</h2>

              <Tabs defaultValue="javascript">
                <TabsList className="mb-4">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="php">PHP</TabsTrigger>
                </TabsList>

                <TabsContent value="javascript">
                  <Card>
                    <CardHeader>
                      <CardTitle>JavaScript Example</CardTitle>
                      <CardDescription>Using fetch API</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted p-3 rounded-md overflow-x-auto">
                        <pre className="text-sm font-mono">
                          {`// Fetch a specific hadith
async function getHadith(collection, id) {
  const response = await fetch(
    \`https://hadithapi.pages.dev/api/\${collection}/\${id}\`
  );
  return await response.json();
}

// Search for hadiths
async function searchHadiths(query, collection = '') {
  const url = new URL('https://hadithapi.pages.dev/api/search');
  url.searchParams.append('q', query);
  if (collection) url.searchParams.append('collection', collection);

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Example usage
async function example() {
  // Get a specific hadith
  const hadith = await getHadith('bukhari', 1);
  console.log(hadith.hadith_english);

  // Search for hadiths
  const results = await searchHadiths('prayer', 'bukhari');
  console.log(\`Found \${results.pagination.total} results\`);
}`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="python">
                  <Card>
                    <CardHeader>
                      <CardTitle>Python Example</CardTitle>
                      <CardDescription>Using requests library</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted p-3 rounded-md overflow-x-auto">
                        <pre className="text-sm font-mono">
                          {`import requests

# Fetch a specific hadith
def get_hadith(collection, hadith_id):
    response = requests.get(
        f"https://hadithapi.pages.dev/api/{collection}/{hadith_id}"
    )
    response.raise_for_status()  # Raise exception for 4XX/5XX responses
    return response.json()

# Search for hadiths
def search_hadiths(query, collection=None, page=1, limit=10):
    params = {
        'q': query,
        'page': page,
        'limit': limit
    }
    
    if collection:
        params['collection'] = collection
        
    response = requests.get(
        "https://hadithapi.pages.dev/api/search",
        params=params
    )
    response.raise_for_status()
    return response.json()

# Example usage
if __name__ == "__main__":
    # Get a specific hadith
    hadith = get_hadith('bukhari', 1)
    print(hadith['hadith_english'])
    
    # Search for hadiths
    results = search_hadiths('prayer', 'bukhari')
    print(f"Found {results['pagination']['total']} results")`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="php">
                  <Card>
                    <CardHeader>
                      <CardTitle>PHP Example</CardTitle>
                      <CardDescription>Using cURL</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted p-3 rounded-md overflow-x-auto">
                        <pre className="text-sm font-mono">
                          {`<?php
// Fetch a specific hadith
function getHadith($collection, $id) {
    $url = "https://hadithapi.pages.dev/api/{$collection}/{$id}";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

// Search for hadiths
function searchHadiths($query, $collection = '', $page = 1, $limit = 10) {
    $url = "https://hadithapi.pages.dev/api/search?q=" . urlencode($query) . 
           "&page={$page}&limit={$limit}";
    
    if (!empty($collection)) {
        $url .= "&collection=" . urlencode($collection);
    }
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

// Example usage
$hadith = getHadith('bukhari', 1);
echo $hadith['hadith_english'] . "\\n";

$results = searchHadiths('prayer', 'bukhari');
echo "Found " . $results['pagination']['total'] . " results\\n";
?>`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>

            <Separator />

            <section id="faq" className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Is this API free to use?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Yes, the API is free to use for non-commercial purposes. We ask that you include proper
                      attribution when using our data and respect the rate limits.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Can I use this API in my commercial application?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      For commercial use, please contact us to discuss licensing options. We offer flexible plans for
                      businesses and commercial applications.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Are the hadiths available in other languages?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Currently, we only provide English translations. We plan to add Arabic text and translations in
                      other languages in the future.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">How accurate are the translations?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The translations are sourced from respected scholarly works. However, no translation can perfectly
                      capture the original meaning. For critical research, we recommend consulting the original Arabic
                      texts.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">How can I contribute to this project?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      We welcome contributions! You can contribute by improving the code, adding new features, fixing
                      bugs, or helping with documentation. Visit our GitHub repository to get started.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
              <h2 className="text-xl font-bold mb-4">Need More Help?</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions or need assistance with the API, feel free to reach out to us.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <a href="mailto:support@hadithapi.example.com">Contact Support</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com/saikothasan/hadithapi/issues" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open an Issue
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

