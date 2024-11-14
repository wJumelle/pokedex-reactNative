import { Image, StyleSheet, TextInput } from "react-native";
import Row from "@/components/Row";
import useThemeColors from "@/hooks/useThemeColors";
import React from "react";

// On définit les props liés à SearchBar
// value sera la valeur récupéré par le formulaire
// onChange sera la fonction a exécuter lorsque du texte sera saisi par l'utilisateur, cette fonction ne ne renvoit rien
type Props = {
  value: string,
  onChange: (s: string) => void
}

function SearchBar({value, onChange}: Props) {
  const colors = useThemeColors();

  return (
    <Row style={[styles.wrapper, { backgroundColor: colors.grayWhite }]} gap={8}>
      <Image source={require("@/assets/images/search.png")} width={16} height={16} />
      <TextInput onChangeText={onChange} value={value} placeholder="Search..." placeholderTextColor={colors.grayMedium} style={[styles.input, {color: colors.grayDark}]}></TextInput>
    </Row>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 12
  },
  input: {
    flex: 1,
    height: 16,
    lineHeight: 16
  }
})

export default SearchBar;
