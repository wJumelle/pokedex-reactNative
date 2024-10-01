import Card from "@/components/Card";
import PokemonCard from "@/components/pokemon/PokemonCard";
import RootView from "@/components/RootView";
import Row from "@/components/Row";
import SearchBar from "@/components/SearchBar";
import SortButton from "@/components/SortButton";
import ThemedText from "@/components/ThemedText";
import { Shadows } from "@/constants/Shadows";
import { getPokemonId } from "@/functions/pokemons";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import useThemeColors from "@/hooks/useThemeColors";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    padding: 12,
    paddingBottom: 8
  },
  form: {
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
  const [ sortKey, setSortKey ] = useState<"id" | "name">("id");
  const pokemons = data?.pages.flatMap(page => page.results.map(r => ({ name: r.name, id: getPokemonId(r.url) }))) ?? [];
  const filteredPokemons = [
    ...(search
      ? pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toString() === search)
      : pokemons)
  ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));

  return (
    <RootView>
        <Row style={styles.header} gap={16}>
          <Image source={require("@/assets/images/pokeball-white.png")} style={styles.tinyLogo} />
          <ThemedText variant="headline" color="grayWhite">Pokedex</ThemedText>
        </Row>
        <Row style={styles.form} gap={16}>
          <SearchBar value={search} onChange={setSearch}></SearchBar>
          <SortButton value={sortKey} onChange={setSortKey}></SortButton>
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
            renderItem={({item}) => <PokemonCard id={item.id} name={item.name} style={{flex: 1/3}} />} keyExtractor={(item) => item.id.toString()}
          />
        </Card>
    </RootView>
  );
}
