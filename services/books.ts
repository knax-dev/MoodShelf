import { EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY } from "@env";

const API_KEY = EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY ?? process.env.EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY;   // API_KEY is required to authorize requests to the Google Books API.

if (!API_KEY) {
  throw new Error("Google Books API key is missing");
}

export async function getBooksByMood(
  query: string,             // query is the search term used to find books related to the mood.
  startIndex: number = 0,    // startIndex is used for pagination to specify the index of the first result to return.
  maxResults: number = 10    // maxResults specifies the maximum number of results to return.
) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`;
  // Using encodeURIComponent allows to convert any text into a safe URL format.

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch books");   // res.ok checks if the response from the API is successful.

  const data = await res.json();
  return data.items ?? [];
}
