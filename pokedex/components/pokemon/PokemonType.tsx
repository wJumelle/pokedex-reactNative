import { Colors } from "@/constants/Colors";
import React from "react";
import { View, ViewStyle } from "react-native";
import ThemedText from "../ThemedText";
import { capitalizeFirstLetter } from "@/functions/pokemons";

type Props = {
  name: keyof (typeof Colors)["types"];
}

function PokemonType({name}: Props) {
  return (
    <View style={[rootStyle, { backgroundColor: Colors.types[name] }]}>
      <ThemedText color={"grayWhite"} variant={"subtitle3"}>{capitalizeFirstLetter(name)}</ThemedText>
    </View>
  )
}

const rootStyle = {
  flex: 0,
  paddingHorizontal: 8,
  paddingVertical: 2,
  height: 20,
  borderRadius: 8,
} satisfies ViewStyle;

export default PokemonType;
