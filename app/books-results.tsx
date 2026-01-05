import { useEffect, useState } from "react";
import { View,Text,FlatList,Pressable,Image,ActivityIndicator,Linking,StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MOODS } from "@/constants/moods";
import { getBooksByMood } from "@/services/books";

interface VolumeInfo {
  title: string;
  authors?: string[];
  publishedDate?: string;
  imageLinks?: { thumbnail?: string };
  infoLink?: string;
}

interface GoogleBook {
  id: string;
  volumeInfo: VolumeInfo;
}

export default function BooksResultsScreen() {
  const { mood } = useLocalSearchParams();    // Hook Expo Router that allows you to get parameters from a URL.
  const router = useRouter();
  const moodData = MOODS[mood as keyof typeof MOODS];    // startIndex indicates which book to start fetching and is used for pagination.

  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  if (!moodData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Mood</Text>
        {Object.entries(MOODS).map(([key, moodItem]) => (
          <Pressable
            key={key}
            onPress={() => router.push({ pathname: "/books-results", params: { mood: key } })}
            style={({ pressed }) => ({
              padding: 16,
              backgroundColor: pressed ? "#d1d5db" : "#e5e7eb",
              borderRadius: 12,
              marginBottom: 12,
              transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
            })}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {typeof moodItem === "string" ? moodItem : moodItem.label}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  }

  // fetchbooks based on the mood and pagination index.
  const fetchBooks = async (newIndex = 0) => {
    setLoading(true);
    try {
      const data = await getBooksByMood(moodData.bookQuery, newIndex, 10);
      setBooks(data);
      setStartIndex(newIndex + 10);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(0);
  }, [moodData]);

  const renderBook = ({ item }: { item: GoogleBook }) => {
    const volume = item.volumeInfo;
    return (
      <Pressable
        style={styles.card}
        onPress={() => volume.infoLink && Linking.openURL(volume.infoLink)}
      >
        {/* Clicking on it will open a link to the book on Google Books. */}
        {volume.imageLinks?.thumbnail ? (
          <Image source={{ uri: volume.imageLinks.thumbnail }} style={styles.poster} />
        ) : (
          <View style={[styles.poster, styles.noPoster]}>
            <Text style={{ color: "#555" }}>No Image</Text>
          </View>
        )}

        {/* Display the book's thumbnail image if available. */}
        <Text style={styles.cardTitle} numberOfLines={2}>
          {volume.title || ""}
        </Text>

        {volume.publishedDate && (
          <Text style={styles.date}>{volume.publishedDate}</Text>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {typeof moodData.label === 'string' ? moodData.label : ''}
      </Text>

      {loading && <ActivityIndicator size="large" color="#4f46e5" />}
       
    {/* FlatList is optimized for large lists. */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {!loading && books.length > 0 && (
        <Pressable style={styles.button} onPress={() => fetchBooks(startIndex)}>
          <Text style={styles.buttonText}>New Books</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 15, color: "#4f46e5", textAlign: "center" },
  card: { width: "48%", backgroundColor: "#fff", borderRadius: 12, padding: 8,
  marginBottom: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 },
  poster: { width: "100%", aspectRatio: 2 / 3, borderRadius: 8, marginBottom: 8 },
  noPoster: { backgroundColor: "#d1d5db", justifyContent: "center", alignItems: "center" },
  cardTitle: { fontSize: 14, fontWeight: "700", color: "#111827" },
  date: { fontSize: 12, color: "#9ca3af", marginTop: 1 },
  button: { backgroundColor: "#4f46e5", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
