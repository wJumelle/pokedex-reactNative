import { Image, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Card from "../Card";
import ThemedText from "../ThemedText";
import useThemeColors from "@/hooks/useThemeColors";
import { capitalizeFirstLetter, getPokemonArtwork } from "@/functions/pokemons";
import { Link } from "expo-router";
import React from "react";

const styles = StyleSheet.create({
  cardPokemon: {
    position: "relative",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    overflow: "hidden"
  },
  imgPokemon: {
    width: 72,
    height: 72
  },
  boxShadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 8,
    zIndex: -1
  }
});

type Props = {
  style?: ViewStyle,
  id: number,
  name: string
}

function PokemonCard({style, id, name}: Props) {
  const colors = useThemeColors();

  return <Link href={{ pathname: "/pokemons/[id]", params: { id: id } }} asChild style={style}>
    <Pressable>
      <Card style={[styles.cardPokemon]}>
        <ThemedText variant="caption" color="grayMedium" style={{alignSelf: 'flex-end'}}>#{id.toString().padStart(3, '0')}</ThemedText>
        <Image source={{uri: getPokemonArtwork(id)}} style={styles.imgPokemon} />
        <ThemedText color="grayDark">{capitalizeFirstLetter(name)}</ThemedText>
        <View style={[styles.boxShadow, {backgroundColor: colors.grayBackground}]} />
      </Card>
    </Pressable>
  </Link>
}

export default PokemonCard;
