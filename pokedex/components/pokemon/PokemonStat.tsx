import React, { useEffect } from "react";
import { StyleSheet, ViewProps } from "react-native";
import Row from "../Row";
import ThemedText from "../ThemedText";
import useThemeColors from "@/hooks/useThemeColors";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type Props = ViewProps & {
  name: string,
  value: number,
  color: string
}

function statsShortName(name: string): string {
  return name.replaceAll('special', 'S').replaceAll('attack', 'ATK').replaceAll('defense', 'DEF').replaceAll('-', '').replaceAll('speed', 'SPD').toUpperCase();
}

function PokemonStat({style, name, value, color, ...rest} : Props) {
  const colors = useThemeColors();
  const sharedValue = useSharedValue(value);
  const barInnerStyle = useAnimatedStyle(() => {
    return {
      flex: sharedValue.value
    };
  });
  const barBackgroundStyle = useAnimatedStyle(() => {
    return {
      flex: 255 - sharedValue.value
    };
  });

  useEffect(() => {
    sharedValue.value = withSpring(value)
  }, [value])

  return (
    <Row style={[style, styles.root]} {...rest} gap={8}>
      <ThemedText variant="subtitle3" style={[styles.name, { color: color, borderColor: colors.grayLight }]}>{statsShortName(name)}</ThemedText>
      <ThemedText style={styles.value}>{value.toString().padStart(3, "0")}</ThemedText>
      <Row style={styles.bar}>
        <Animated.View style={[styles.innerBar, barInnerStyle, { backgroundColor: color }]}></Animated.View>
        <Animated.View style={[styles.backgroundBar, barBackgroundStyle, { backgroundColor: color }]}></Animated.View>
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
    opacity: 0.20
  }
})

export default PokemonStat;
