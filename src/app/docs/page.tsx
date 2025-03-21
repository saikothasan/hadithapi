export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-6">API Documentation</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          Welcome to the Hadith API documentation. This guide will help you understand how to use our API to access
          hadith collections programmatically.
        </p>

        <h2>Base URL</h2>
        <p>All API requests should be made to:</p>
        <pre>
          <code>https://hadithapi.pages.dev/api</code>
        </pre>

        <h2>Authentication</h2>
        <p>
          Currently, the API is open and does not require authentication. However, we implement rate limiting to prevent
          abuse.
        </p>

        <h2>Rate Limiting</h2>
        <p>
          To ensure fair usage, we limit requests to 100 per hour per IP address. If you exceed this limit, you'll
          receive a 429 Too Many Requests response.
        </p>

        <h2>Endpoints</h2>

        <h3>Get a specific hadith</h3>
        <pre>
          <code>
            GET /api/{"{collection}"}/{"{id}"}
          </code>
        </pre>
        <p>Retrieves a specific hadith by its ID from a collection.</p>
        <p>
          <strong>Path Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>collection</code> - The name of the hadith collection (bukhari, muslim, abudawud, ibnmajah, tirmidhi)
          </li>
          <li>
            <code>id</code> - The ID of the hadith within the collection
          </li>
        </ul>
        <p>
          <strong>Example Request:</strong>
        </p>
        <pre>
          <code>GET /api/bukhari/1</code>
        </pre>
        <p>
          <strong>Example Response:</strong>
        </p>
        <pre>
          <code>{`{
  "id": 1,
  "header": "Narrated by...",
  "hadith_english": "The hadith text...",
  "book": "Sahih Bukhari",
  "refno": "Bukhari 1",
  "bookName": "Book of Revelation",
  "chapterName": "How the Divine Revelation started"
}`}</code>
        </pre>

        <h3>Get multiple hadiths</h3>
        <pre>
          <code>
            GET /api/{"{collection}"}?page={"{page}"}&limit={"{limit}"}
          </code>
        </pre>
        <p>Retrieves multiple hadiths from a collection with pagination.</p>
        <p>
          <strong>Path Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>collection</code> - The name of the hadith collection
          </li>
        </ul>
        <p>
          <strong>Query Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>page</code> - The page number (default: 1)
          </li>
          <li>
            <code>limit</code> - The number of hadiths per page (default: 10, max: 100)
          </li>
        </ul>
        <p>
          <strong>Example Request:</strong>
        </p>
        <pre>
          <code>GET /api/muslim?page=1&limit=10</code>
        </pre>
        <p>
          <strong>Example Response:</strong>
        </p>
        <pre>
          <code>{`{
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
}`}</code>
        </pre>

        <h3>Search hadiths</h3>
        <pre>
          <code>
            GET /api/search?q={"{query}"}&collection={"{collection}"}&page={"{page}"}&limit={"{limit}"}
          </code>
        </pre>
        <p>Searches for hadiths containing the specified query.</p>
        <p>
          <strong>Query Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>q</code> - The search query (required)
          </li>
          <li>
            <code>collection</code> - The name of the hadith collection (optional)
          </li>
          <li>
            <code>page</code> - The page number (default: 1)
          </li>
          <li>
            <code>limit</code> - The number of hadiths per page (default: 10, max: 100)
          </li>
        </ul>
        <p>
          <strong>Example Request:</strong>
        </p>
        <pre>
          <code>GET /api/search?q=prayer&collection=bukhari&page=1&limit=10</code>
        </pre>
        <p>
          <strong>Example Response:</strong>
        </p>
        <pre>
          <code>{`{
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
}`}</code>
        </pre>

        <h2>Error Handling</h2>
        <p>The API uses standard HTTP status codes to indicate the success or failure of a request:</p>
        <ul>
          <li>
            <code>200 OK</code> - The request was successful
          </li>
          <li>
            <code>400 Bad Request</code> - The request was invalid
          </li>
          <li>
            <code>404 Not Found</code> - The requested resource was not found
          </li>
          <li>
            <code>429 Too Many Requests</code> - Rate limit exceeded
          </li>
          <li>
            <code>500 Internal Server Error</code> - An error occurred on the server
          </li>
        </ul>
        <p>Error responses include a JSON object with an error message:</p>
        <pre>
          <code>{`{
  "error": "Error message"
}`}</code>
        </pre>

        <h2>CORS</h2>
        <p>
          The API supports Cross-Origin Resource Sharing (CORS) for all origins, allowing you to use it from any
          website.
        </p>

        <h2>Examples</h2>
        <h3>JavaScript Example</h3>
        <pre>
          <code>{`// Fetch a specific hadith
async function getHadith(collection, id) {
  const response = await fetch(\`https://hadithapi.pages.dev/api/\${collection}/\${id}\`);
  const data = await response.json();
  return data;
}

// Search for hadiths
async function searchHadiths(query, collection = '') {
  const url = new URL('https://hadithapi.pages.dev/api/search');
  url.searchParams.append('q', query);
  if (collection) url.searchParams.append('collection', collection);
  
  const response = await fetch(url);
  const data = await response.json();
  return data;
}`}</code>
        </pre>
      </div>
    </div>
  )
}

