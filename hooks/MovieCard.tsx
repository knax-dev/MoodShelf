import { View, Text, Image } from "react-native";

export default function MovieCard({ movie }: any) {
  return (
    <View style={{ marginBottom: 15 }}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={{ height: 200, borderRadius: 10 }}
      />
      <Text>{movie.title}</Text>
    </View>
  );
}