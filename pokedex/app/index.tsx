import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>It's working.</Text>
      <Link href="/about">About</Link>
      <Link href="/pokemons/25">Pikachu</Link>
      <Link href={{pathname: '/pokemons/[id]', params: {id: 25}}}>Pikachu</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    padding: 24,
    flex: 1
  }
});
