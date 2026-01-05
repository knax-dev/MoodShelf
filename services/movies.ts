import { EXPO_PUBLIC_TMDB_API_KEY } from "@env";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = EXPO_PUBLIC_TMDB_API_KEY ?? process.env.EXPO_PUBLIC_TMDB_API_KEY; // API_KEY is required to access the TMDB API in order to access the server and retrieve data.

if (!API_KEY) {
  throw new Error("TMDB API key is missing");
}

export async function getMoviesByMood(
  genres: number[],                    // genres is an id TMBD uses to categorize movies.
  page: number = 1,                    // page is used for pagination to specify which page of results to return.
  sortBy: string = "popularity.desc"   // sortBy determines the order in which the movies are sorted, defaulting to popularity in descending order.
) {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genres.join(
    ","
  )}&sort_by=${sortBy}&page=${page}&include_adult=false`;

  const res = await fetch(url);  // Using fetch allows me to access the server and not wait for a response immediately. await waits for a response from fetch, but the rest of the code does not stop.
  if (!res.ok) throw new Error("Failed to fetch movies");  // res.ok is API error handling to check if the response is succsessful.

  const data = await res.json();
  return data.results;
}
