import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Row from "../Row";
import ThemedText from "../ThemedText";
import useThemeColors from "@/hooks/useThemeColors";

type Props = ViewProps & {
  name: string,
  value: number,
  color: string
}

function PokemonStat({style, name, value, color, ...rest} : Props) {
  const colors = useThemeColors();

  return (
    <Row style={[style, styles.root]} {...rest} gap={8}>
      <ThemedText variant="subtitle3" style={[styles.name, { color: color, borderColor: colors.grayLight }]}>{name}</ThemedText>
      <ThemedText style={styles.value}>{value.toString().padStart(3, "0")}</ThemedText>
      <Row style={styles.bar}>
        <View style={[styles.innerBar, { flex: 1, backgroundColor: color }]}></View>
        <View style={[styles.backgroundBar, { flex: 1, backgroundColor: color }]}></View>
      </Row>
    </Row>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '100%'
  },
  name: {
    width: 31,
    borderRightWidth: 1,
    borderStyle: 'solid'
  },
  value: {
    width: 23
  },
  bar: {
    flex: 1,
    width: 100,
    height: 4,
    borderRadius: 4,
    overflow: 'hidden'
  },
  innerBar: {
    height: 4
  },
  backgroundBar: {
    height: 4,
    opacity: 20
  }
})

export default PokemonStat;
