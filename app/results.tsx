import { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, Image, Linking, Animated, } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MOODS } from "@/constants/moods";
import { getMoviesByMood } from "@/services/movies";
import MovieCard, { Movie } from "@/components/MovieCard";
import SkeletonCard from "@/components/SkeletonCard";

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

export default function MoviesResultsScreen() {
  const { mood } = useLocalSearchParams();
  const moodData = MOODS[mood as keyof typeof MOODS];

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const modalOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.8)).current;

  // Animation functions for modal open
  const animateModalOpen = () => {
    Animated.parallel([
      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(modalScale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animation functions for modal close
  const animateModalClose = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(modalScale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => callback());
  };

  const loadMovies = async () => {        // Load movies based on the selected mood and current page for pagination.
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

      const formattedData: Movie[] = data.map((m: Movie & { genre_ids?: number[] }) => ({
        ...m,
        genres: m.genres ?? m.genre_ids?.map((id) => ({ id, name: GENRES_MAP[id] })) ?? [],
      }));

      setMovies(formattedData.slice(0, 10));
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

  useEffect(() => {
    if (selectedMovie) animateModalOpen();       // When a movie card is pressed, set the selected movie and trigger the modal open animation.
  }, [selectedMovie]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{moodData?.label || "Movies"}</Text>

      {loading && (
        <FlatList
          data={[...Array(6)]}
          keyExtractor={(_, i) => i.toString()}
          renderItem={() => <SkeletonCard />}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {!loading && error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} onPress={() => setSelectedMovie(item)} />}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {!loading && (
        <TouchableOpacity style={styles.button} onPress={() => setPage((prev) => prev + 1)}>
          <Text style={styles.buttonText}>New Movies</Text>
        </TouchableOpacity>
      )}

      <Modal transparent visible={!!selectedMovie} onRequestClose={() => selectedMovie && animateModalClose(() => setSelectedMovie(null))}>
        <Animated.View style={[styles.modalOverlay, { opacity: modalOpacity }]}>
          <Animated.View style={[styles.modalContent, { transform: [{ scale: modalScale }] }]}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}>
              {selectedMovie?.poster_path && (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}` }}
                  style={styles.modalPoster}
                  resizeMode="cover"
                />
              )}

              <Text style={styles.modalTitle}>{selectedMovie?.title}</Text>

              {selectedMovie?.genres && selectedMovie.genres.length > 0 && (
                <Text style={styles.modalInfo}>
                  Genres: {selectedMovie.genres.map((g) => g.name).join(", ")}
                </Text>
              )}

              {typeof selectedMovie?.vote_average === "number" && (
                <Text style={styles.modalInfo}>⭐ {selectedMovie.vote_average.toFixed(1)}</Text>
              )}

              {selectedMovie?.overview && (
                <Text style={styles.modalOverview}>{selectedMovie.overview}</Text>
              )}

              {selectedMovie?.id && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(`https://www.themoviedb.org/movie/${selectedMovie.id}`)} //// Opens the movie's page on TMDB in the browser.
                  style={{ marginTop: 10 }}
                >
                  <Text style={{ color: "#4f46e5", fontWeight: "600" }}>Go to TMDB</Text>
                </TouchableOpacity>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => selectedMovie && animateModalClose(() => setSelectedMovie(null))}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, color: "#4f46e5", textAlign: "center" },
  button: { backgroundColor: "#4f46e5", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  error: { color: "red", marginVertical: 10 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "90%", backgroundColor: "#fff", borderRadius: 12, maxHeight: "80%", padding: 20, alignItems: "center" },
  modalPoster: { width: "100%", aspectRatio: 2 / 3, borderRadius: 10, marginBottom: 10, height: 350, alignSelf: "center" },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  modalInfo: { fontSize: 13, marginBottom: 5 },
  modalOverview: { fontSize: 13, marginTop: 8, color: "#333" },
  link: { marginTop: 10, fontSize: 13, fontWeight: "600", color: "#4f46e5" },
  modalCloseButton: { backgroundColor: "#4f46e5", paddingVertical: 14, paddingHorizontal: 100, borderRadius: 12, alignItems: "center", marginTop: 10 },
  modalCloseText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
