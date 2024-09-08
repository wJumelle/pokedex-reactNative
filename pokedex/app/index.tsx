import Card from "@/components/Card";
import PokemonCard from "@/components/pokemon/PokemonCard";
import ThemedText from "@/components/ThemedText";
import { Shadows } from "@/constants/Shadows";
import { getPokemonId } from "@/functions/pokemons";
import useFetchQuery from "@/hooks/useFetchQuery";
import useThemeColors from "@/hooks/useThemeColors";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12
  },
  tinyLogo: {
    width: 24,
    height: 24
  },
  body: {
    flex: 1,
    ...Shadows.dp2,
  },
  grid: {
    paddingVertical: 24,
    paddingHorizontal: 12
  },
  gridGap: {
    gap: 8
  }
});

export default function Index() {
  const colors = useThemeColors();
  const { data } = useFetchQuery('/pokemon?limit=21');
  const pokemons = data?.results ?? [];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
        <View style={styles.header}>
          <Image source={require("@/assets/images/pokeball-white.png")} style={styles.tinyLogo} />
          <ThemedText variant="headline" color="grayWhite">Pokedex</ThemedText>
        </View>
        <Card style={styles.body}>
          <FlatList
            data={pokemons}
            numColumns={3}
            contentContainerStyle={[styles.gridGap, styles.grid]}
            columnWrapperStyle={styles.gridGap}
            renderItem={({item}) => <PokemonCard id={getPokemonId(item.url)} name={item.name} style={{flex: 1/3}} />} keyExtractor={(item) => item.url}
          />
        </Card>
    </SafeAreaView>
  );
}
