import Card from "@/components/Card";
import PokemonSpec from "@/components/pokemon/PokemonSpec";
import PokemonType from "@/components/pokemon/PokemonType";
import RootView from "@/components/RootView";
import Row from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { capitalizeFirstLetter, formatWeight, getPokemonArtwork } from "@/functions/pokemons";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import useThemeColors from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    flex: 1
  },
  artwork: {
    position: 'absolute',
    top: -144,
    alignSelf: "center",
    width: 200,
    height: 200,
    zIndex: 5,
  },
  pokeball_bkg: {
    position: "absolute",
    top: 8,
    right: 8,
    opacity: .1,
    width: 206,
    height: 208
  },
  body: {
    flex: 1,
    marginTop: 144,
  },
  card: {
    flex: 1,
    gap: 16,
    alignItems: 'center',
    padding: 20,
    paddingTop: 56,
  },
  card_row: {
    justifyContent: 'center'
  }
});

function Pokemon() {
  const colors = useThemeColors();
  const params = useLocalSearchParams() as {id: string};
  const { data: pokemon } = useFetchQuery('/pokemon/[id]', {id: params.id});
  const { data: species } = useFetchQuery('/pokemon-species/[id]', {id: params.id});
  const mainType = pokemon?.types?.[0].type.name;
  const colorType = mainType ? Colors.types[mainType] : colors.tint;
  const types = pokemon?.types ?? [];
  const bio = species?.flavor_text_entries?.find(({language}) => language.name === "en")?.flavor_text.replaceAll("\n", " ").replaceAll("\f", "\n");
  console.log({mainType, colorType});

  return (
    <RootView style={ {backgroundColor: colorType} }>
      <View style={styles.container}>
        <Image source={require("@/assets/images/pokeball_big.png")} style={styles.pokeball_bkg} />
        <Row style={styles.headerBar} gap={8}>
          <Pressable onPress={router.back}>
            <Image source={require("@/assets/images/arrow_back-white.png")} width={32} height={32} />
          </Pressable>
          <ThemedText variant="headline" color="grayWhite" style={styles.title}>{pokemon?.name ? capitalizeFirstLetter(pokemon.name) : ''}</ThemedText>
          <ThemedText variant="subtitle2" color="grayWhite">#{params.id.toString().padStart(3, '0')}</ThemedText>
        </Row>
        <View style={styles.body}>
          <Image source={{uri: getPokemonArtwork(params.id)}} style={styles.artwork} />
          <Card style={styles.card}>
            <Row style={styles.card_row} gap={16}>
              {types.map( type => <PokemonType name={type.type.name} key={type.type.name} />)}
            </Row>

            {/* About */}
            <ThemedText variant="subtitle1" style={{color: colorType}}>About</ThemedText>
            <Row>
              <PokemonSpec title={formatWeight(pokemon?.weight)} description="Weight" image={require("@/assets/images/weight.png")} style={{borderStyle: "solid", borderRightWidth: 1, borderColor: colors.grayLight}}/>
              <PokemonSpec title={formatWeight(pokemon?.height)} description="Height" image={require("@/assets/images/straighten.png")} style={{borderStyle: "solid", borderRightWidth: 1, borderColor: colors.grayLight}}/>
              <PokemonSpec title={pokemon?.moves.slice(0,2).map(m => m.move.name).join("\n")} description="Moves" />
            </Row>
            <ThemedText>{bio}</ThemedText>

            {/* Base stats */}
            <ThemedText variant="subtitle1" style={{color: colorType}}>Base stats</ThemedText>
          </Card>
        </View>
      </View>
    </RootView>
  )
}

export default Pokemon;
