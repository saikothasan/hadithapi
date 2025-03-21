export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-6">About Hadith API</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          The Hadith API provides programmatic access to authentic hadith collections. Our goal is to make these
          valuable Islamic texts more accessible to developers, researchers, and the general public.
        </p>

        <h2>Collections</h2>
        <p>We currently offer the following hadith collections:</p>

        <ul>
          <li>
            <strong>Sahih Bukhari</strong> - Contains 7,563 hadiths
          </li>
          <li>
            <strong>Sahih Muslim</strong> - Contains 3,032 hadiths
          </li>
          <li>
            <strong>Sunan Abu Dawud</strong> - Contains 3,998 hadiths
          </li>
          <li>
            <strong>Sunan Ibn Majah</strong> - Contains 4,342 hadiths
          </li>
          <li>
            <strong>Jami at-Tirmidhi</strong> - Contains 3,956 hadiths
          </li>
        </ul>

        <h2>Data Format</h2>
        <p>Each hadith in our database contains the following information:</p>

        <ul>
          <li>
            <strong>id</strong> - The unique identifier for the hadith within its collection
          </li>
          <li>
            <strong>header</strong> - The chain of narration (isnad)
          </li>
          <li>
            <strong>hadith_english</strong> - The English translation of the hadith text
          </li>
          <li>
            <strong>book</strong> - The name of the collection (e.g., "Sahih Bukhari")
          </li>
          <li>
            <strong>refno</strong> - The reference number in the format "Collection Name Number"
          </li>
          <li>
            <strong>bookName</strong> - The name of the specific book within the collection
          </li>
          <li>
            <strong>chapterName</strong> - The name of the chapter within the book
          </li>
        </ul>

        <h2>API Usage</h2>
        <p>Our API is free to use for non-commercial purposes. We ask that you:</p>

        <ul>
          <li>Include proper attribution when using our data</li>
          <li>Do not modify the hadith texts</li>
          <li>Respect rate limits to ensure availability for all users</li>
        </ul>

        <h2>Contributing</h2>
        <p>
          We welcome contributions to improve the API and expand our collection. If you'd like to contribute, please
          visit our GitHub repository.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions, suggestions, or feedback, please reach out to us at contact@hadithapi.example.com.
        </p>
      </div>
    </div>
  )
}

