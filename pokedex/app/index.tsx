import ThemedText from "@/components/ThemedText";
import useThemeColors from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <ThemedText variant="headline" color="grayWhite">Pokedex</ThemedText>
      <Link href="/about">About</Link>
      <Link href="/pokemons/25">Pikachu</Link>
      <Link href={{pathname: '/pokemons/[id]', params: {id: 25}}}>Pikachu</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
