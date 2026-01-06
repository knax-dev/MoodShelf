import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function SkeletonCard() {
  const opacity = useRef(new Animated.Value(0.4)).current;
// Initial opacity for the skeleton loading effect

  useEffect(() => {
    // Animation loop for pulsing effect
    Animated.loop(
      Animated.sequence([
        // Fade in animation
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        // Fade out animation
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    // Skeleton card structure with animated opacity
    <Animated.View style={[styles.card, { opacity }]}>
      <View style={styles.poster} />
      <View style={styles.line} />
      <View style={[styles.line, { width: "60%" }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { width: "48%", marginBottom: 15, },
  poster: { width: "100%", aspectRatio: 2 / 3, borderRadius: 10, backgroundColor: "#e5e7eb", marginBottom: 8, },
  line: { height: 12, backgroundColor: "#e5e7eb", borderRadius: 6, marginBottom: 6, width: "100%", },
});
