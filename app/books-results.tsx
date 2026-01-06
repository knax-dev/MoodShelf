import { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, Pressable, Modal, StyleSheet, Linking, ScrollView, Image, Animated, } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MOODS } from "@/constants/moods";
import { getBooksByMood } from "@/services/books";
import { BookCard } from "@/components/BookCard";
import SkeletonCard from "@/components/SkeletonCard";
import { Book } from "@/types/book";

export default function BooksResultsScreen() {
  const { mood } = useLocalSearchParams();    // Hook Expo Router that allows you to get parameters from a URL.
  const router = useRouter();
  const moodData = MOODS[mood as keyof typeof MOODS];   // startIndex indicates which book to start fetching and is used for pagination.

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.8)).current;

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

  if (!moodData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Mood</Text>
        {Object.entries(MOODS).map(([key, moodItem]) => (
          <Pressable
            key={key}
            onPress={() =>
              router.push({ pathname: "/books-results", params: { mood: key } })
            }
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

   // Fetch books by mood with pagination
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

  useEffect(() => {
    if (selectedBook) animateModalOpen();
  }, [selectedBook]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {typeof moodData.label === "string" ? moodData.label : ""}
      </Text>

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

      {!loading && books.length === 0 && <Text style={styles.error}>No books found</Text>}

     {/* FlatList is optimized for large lists. */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookCard book={item} onPress={() => setSelectedBook(item)} />}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {!loading && books.length > 0 && (
        <Pressable style={styles.button} onPress={() => fetchBooks(startIndex)}>
          <Text style={styles.buttonText}>New Books</Text>
        </Pressable>
      )}

      <Modal
        transparent
        visible={!!selectedBook}
        onRequestClose={() =>
          selectedBook && animateModalClose(() => setSelectedBook(null))
        }
      >
        <Animated.View style={[styles.modalOverlay, { opacity: modalOpacity }]}>
          <Animated.View style={[styles.modalContent, { transform: [{ scale: modalScale }] }]}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}>
              {selectedBook?.volumeInfo.imageLinks?.thumbnail && (
                <Image
                  source={{ uri: selectedBook.volumeInfo.imageLinks.thumbnail }}
                  style={styles.modalPoster}
                />
              )}

              <Text style={styles.modalTitle}>{selectedBook?.volumeInfo.title}</Text>

              {selectedBook?.volumeInfo.description && (
                <Text style={styles.modalOverview}>{selectedBook.volumeInfo.description}</Text>
              )}

              {selectedBook?.volumeInfo?.infoLink && (
                <Pressable
                  onPress={() => Linking.openURL(selectedBook.volumeInfo.infoLink!)}
                  style={{ marginTop: 10 }}
                >
                  <Text style={{ color: "#4f46e5", fontWeight: "600" }}>
                    Open in Google Books
                  </Text>
                </Pressable>
              )}
            </ScrollView>

            <Pressable
              style={styles.modalCloseButton}
              onPress={() => selectedBook && animateModalClose(() => setSelectedBook(null))}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </Pressable>
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
  modalOverview: { fontSize: 13, marginTop: 8, color: "#333" },
  modalCloseButton: { backgroundColor: "#4f46e5", paddingVertical: 14, paddingHorizontal: 80, borderRadius: 12, alignItems: "center", marginTop: 10 },
  modalCloseText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
