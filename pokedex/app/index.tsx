import Card from "@/components/Card";
import PokemonCard from "@/components/pokemon/PokemonCard";
import Row from "@/components/Row";
import SearchBar from "@/components/SearchBar";
import ThemedText from "@/components/ThemedText";
import { Shadows } from "@/constants/Shadows";
import { getPokemonId } from "@/functions/pokemons";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import useThemeColors from "@/hooks/useThemeColors";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  },
  header: {
    padding: 12,
    paddingBottom: 8
  },
  searchBar: {
    paddingBottom: 24,
    paddingHorizontal: 12
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
  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery('/pokemon?limit=21');
  const [ search, setSearch ] = useState('');
  const pokemons = data?.pages.flatMap(page => page.results) ?? [];
  const filteredPokemons = search ?
    pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || getPokemonId(p.url).toString() === search) : pokemons;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
        <Row style={styles.header} gap={16}>
          <Image source={require("@/assets/images/pokeball-white.png")} style={styles.tinyLogo} />
          <ThemedText variant="headline" color="grayWhite">Pokedex</ThemedText>
        </Row>
        <Row style={styles.searchBar}>
          <SearchBar value={search} onChange={setSearch}></SearchBar>
        </Row>
        <Card style={styles.body}>
          <FlatList
            data={filteredPokemons}
            numColumns={3}
            contentContainerStyle={[styles.gridGap, styles.grid]}
            columnWrapperStyle={styles.gridGap}
            ListFooterComponent={
              isFetching ? <ActivityIndicator color={colors.tint} size="large"/> : null
            }
            onEndReached={() => fetchNextPage()}
            renderItem={({item}) => <PokemonCard id={getPokemonId(item.url)} name={item.name} style={{flex: 1/3}} />} keyExtractor={(item) => item.url}
          />
        </Card>
    </SafeAreaView>
  );
}
