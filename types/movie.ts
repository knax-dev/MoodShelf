export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title?: string;
  poster_path?: string | null;
  release_date?: string;
  genres?: Genre[]; 
  vote_average?: number;
  overview?: string;
}
