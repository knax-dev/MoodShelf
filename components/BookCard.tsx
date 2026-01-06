import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { Book } from "@/types/book";

interface Props {
  book: Book;
  onPress?: () => void;
}

export function BookCard({ book, onPress }: Props) {
  const volume = book.volumeInfo;
  const poster = volume.imageLinks?.thumbnail?.replace("http://", "https://") ?? null;
  // Switching from http to https for security 

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {poster ? (
        <Image source={{ uri: poster }} style={styles.poster} resizeMode="cover" />
      ) : (
        <View style={[styles.poster, styles.noPoster]}>
          <Text style={{ color: "#555" }}>No Image</Text>
        </View>
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {volume.title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: "48%", marginBottom: 15, borderRadius: 12, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5, overflow: "hidden", },
  poster: { width: "100%", aspectRatio: 2 / 3,  },
  noPoster: { backgroundColor: "#d1d5db", justifyContent: "center", alignItems: "center", aspectRatio: 2 / 3, },
  titleContainer: { backgroundColor: "#f3f4f6", paddingVertical: 8, paddingHorizontal: 6, width: "100%", },
  cardTitle: { fontSize: 14, fontWeight: "700", color: "#111827", textAlign: "center", },
});
