import RootView from "@/components/RootView";
import Row from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { capitalizeFirstLetter, getPokemonArtwork } from "@/functions/pokemons";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import useThemeColors from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
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
    alignSelf: "center",
    width: 200,
    height: 200
  },
  pokeball_bkg: {
    position: "absolute",
    top: 8,
    right: 8,
    opacity: .1,
    width: 206,
    height: 208
  }
});

function Pokemon() {
  const colors = useThemeColors();
  const params = useLocalSearchParams() as {id: string};
  const { data: pokemon } = useFetchQuery('/pokemon/[id]', {id: params.id});
  const mainType = pokemon?.types?.[0].type.name;
  const colorType = mainType ? Colors.types[mainType] : colors.tint;
  console.log({mainType, colorType});

  return (
    <RootView style={ {backgroundColor: colorType} }>
      <View>
        <Image source={require("@/assets/images/pokeball_big.png")} style={styles.pokeball_bkg} />
        <Row style={styles.headerBar} gap={8}>
          <Pressable onPress={router.back}>
            <Image source={require("@/assets/images/arrow_back-white.png")} width={32} height={32} />
          </Pressable>
          <ThemedText variant="headline" color="grayWhite" style={styles.title}>{pokemon?.name ? capitalizeFirstLetter(pokemon.name) : ''}</ThemedText>
          <ThemedText variant="subtitle2" color="grayWhite">#{params.id.toString().padStart(3, '0')}</ThemedText>
        </Row>
        <Image source={{uri: getPokemonArtwork(params.id)}} style={styles.artwork} />
      </View>
    </RootView>
  )
}

export default Pokemon;
