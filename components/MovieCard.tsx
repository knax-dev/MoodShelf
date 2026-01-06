import { Text, Image, StyleSheet, Pressable, Animated } from "react-native";
import { useRef, useEffect } from "react";

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title?: string;
  poster_path?: string | null;
  genres?: Genre[];
  vote_average?: number;
  overview?: string;
}

interface Props {
  movie: Movie;
  onPress?: () => void;
}

export default function MovieCard({ movie, onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;
  // Scale for press effect, opacity and translatey for entrance animation

  useEffect(() => {
    // Run entrance animation in parallel
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <Animated.View
      style={{ width: "48%", marginBottom: 15, opacity, transform: [{ translateY }, { scale }], }}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() =>
          Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start()
        }
        onPressOut={() =>
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()
        }
      >
        <Image source={{ uri: posterUrl }} style={styles.poster} />
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  poster: { width: "100%", aspectRatio: 2 / 3, borderRadius: 10, },
  title: { marginTop: 6, fontSize: 14, fontWeight: "600", },
});
