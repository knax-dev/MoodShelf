import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { MOODS } from "@/constants/moods"; 

export default function MoodScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        What is your mood?
      </Text>

      {Object.entries(MOODS).map(([key, mood]) => (
        <Pressable
          key={key}
          onPress={() =>          // When a mood button is pressed, navigate to the results page with the selected mood as a parameter.
            router.push({
              pathname: "../results",
              params: { mood: key },
            })
          }
          style={{
            padding: 15,
            backgroundColor: "#e5e7eb",
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>{mood.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
