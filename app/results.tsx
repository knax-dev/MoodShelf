import { useEffect, useState } from "react";
import {View,Text,FlatList,ActivityIndicator,Image,TouchableOpacity,StyleSheet,Modal,ScrollView,Linking,} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MOODS } from "@/constants/moods";
import { getMoviesByMood } from "@/services/movies";

const GENRES_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  14: "Fantasy",
  27: "Horror",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller",
};

type Movie = {
  id: number;
  title?: string;
  poster_path?: string | null;
  release_date?: string;
  genre_ids?: number[];
  vote_average?: number;
  overview?: string;
};

export default function ResultsScreen() {
  const { mood } = useLocalSearchParams();
  const moodData = MOODS[mood as keyof typeof MOODS];

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const loadMovies = async () => {   // Load movies based on the selected mood and current page for pagination.
    if (!moodData) return;
    setLoading(true);
    setError("");

    try {
      const data = await getMoviesByMood(moodData.movieGenres, page);

      if (!data || data.length === 0) {
        setError("No movies found");
        setMovies([]);
        return;
      }

      setMovies(data.slice(0, 10));
    } catch (err) {
      console.error(err);
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [moodData, page]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{moodData?.label || "Movies"}</Text>

      {loading && <ActivityIndicator size="large" color="#4f46e5" />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const title = item.title || "";
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => setSelectedMovie(item)}   // When a movie card is pressed, set the selected movie to show details in a modal.
            >
              {item.poster_path ? (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                  style={styles.poster}
                />
              ) : (
                <View style={[styles.poster, styles.noPoster]}>
                  <Text>No Image</Text>
                </View>
              )}
              <Text style={styles.cardTitle}>{title}</Text>
            </TouchableOpacity>
          );
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {!loading && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setPage((prev) => prev + 1)}
        >
          <Text style={styles.buttonText}>New Movies</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={!!selectedMovie}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedMovie(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>{selectedMovie?.title}</Text>
              <Text style={styles.modalInfo}>
                Genres: {selectedMovie?.genre_ids?.map((id) => GENRES_MAP[id]).filter(Boolean).join(", ")}   {/* Display genres by mapping genre IDs to names. */}
              </Text>
              {typeof selectedMovie?.vote_average === "number" && (
                <Text style={styles.modalInfo}>⭐ {selectedMovie.vote_average?.toFixed(1)}</Text>
              )}
              {selectedMovie?.overview && (
                <Text style={styles.modalOverview}>{selectedMovie.overview}</Text>
              )}
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`https://www.themoviedb.org/movie/${selectedMovie?.id}`)   // Opens the movie's page on TMDB in the browser.
                }
              >
                <Text style={styles.link}>Go to TMDB</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { marginTop: 20 }]}
                onPress={() => setSelectedMovie(null)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 15, color: "#4f46e5" },
  card: { width: "48%", marginBottom: 10 },
  poster: { width: "100%", aspectRatio: 2 / 3, borderRadius: 10 },
  noPoster: { backgroundColor: "#d1d5db", justifyContent: "center", alignItems: "center" },
  cardTitle: { fontSize: 14, fontWeight: "600", marginTop: 5 },
  button: { backgroundColor: "#4f46e5", padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  error: { color: "red", marginVertical: 10 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", padding: 20 },
  modalContent: { backgroundColor: "#fff", borderRadius: 12, padding: 20, maxHeight: "80%" },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  modalInfo: { fontSize: 14, marginBottom: 5 },
  modalOverview: { fontSize: 14, marginTop: 10, color: "#333" },
  link: { marginTop: 10, fontSize: 14, fontWeight: "600", color: "#4f46e5" },
});
