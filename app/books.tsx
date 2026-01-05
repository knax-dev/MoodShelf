import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { MOODS } from "@/constants/moods";

export default function MoodBooksScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 30, textAlign: "center" }}>
        What is your mood?
      </Text>

      {Object.entries(MOODS).map(([key, mood]) => (    // Convert the MOODS object into an array of pairs [key, value] and dynamically generate a button for each pair.
        <Pressable
          key={key}
          onPress={() =>
            router.push({
              pathname: "/books-results",
              params: { mood: key },
            })
          }
          style={({ pressed }) => ({
            padding: 16,
            backgroundColor: pressed ? "#d1d5db" : "#e5e7eb",
            borderRadius: 12,
            marginBottom: 12,
            transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          })}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{mood.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
