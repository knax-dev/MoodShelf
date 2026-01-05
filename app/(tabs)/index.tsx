import { View, Text, Pressable, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { MOODS } from "@/constants/moods";

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "#fff" : "#4b5563";
  const subtitleColor = colorScheme === "dark" ? "#d1d5db" : "#6b7280";

  const moodKeys = Object.keys(MOODS);

  const getRandomMood = () =>
    moodKeys[Math.floor(Math.random() * moodKeys.length)]; // The function selects a random mood from 0 to 8 in the mood array.

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}
    >
      <Text
        style={{
          fontSize: 36,
          fontWeight: "900",
          color: textColor,
          marginBottom: 10,
        }}
      >
        MoodShelf
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: subtitleColor,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        What mood are you today?
      </Text>

      <Pressable
        onPress={() => router.push("/mood" as const)}
        style={({ pressed }) => ({
          width: "80%",
          padding: 15,
          backgroundColor: pressed ? "#4338ca" : "#4f46e5",
          borderRadius: 10,
          marginBottom: 15,
          alignItems: "center",
          transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
        })}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>🎬 Movies</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/books-results" as const)}
        style={({ pressed }) => ({
          width: "80%",
          padding: 15,
          backgroundColor: pressed ? "#059669" : "#10b981",
          borderRadius: 10,
          marginBottom: 15,
          alignItems: "center",
          transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
        })}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>📚 Books</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          const randomMood = getRandomMood();
          router.push(`/results?mood=${randomMood}`);
        }}
        style={({ pressed }) => ({
          width: "80%",
          padding: 15,
          backgroundColor: pressed ? "#d97706" : "#f59e0b",
          borderRadius: 10,
          marginTop: 30,
          alignItems: "center",
          transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
        })}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>🎲 Surprise Me Movies</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          const randomMood = getRandomMood();
          router.push(`/books-results?mood=${randomMood}`);
        }}
        style={({ pressed }) => ({
          width: "80%",
          padding: 15,
          backgroundColor: pressed ? "#b45309" : "#f97316",
          borderRadius: 10,
          marginTop: 15,
          alignItems: "center",
          transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
        })}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>🎲 Surprise Me Books</Text>
      </Pressable>
    </View>
  );
}
