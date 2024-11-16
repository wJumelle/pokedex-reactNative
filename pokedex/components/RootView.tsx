import useThemeColors from "@/hooks/useThemeColors";
import React, { useEffect } from "react";
import { ViewProps, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { Easing, interpolateColor, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = ViewProps & {
  backgroundColor?: string
};

const rootStyle = {
  flex: 1,
  padding: 4
} satisfies ViewStyle;

function RootView({style, backgroundColor, ...rest}: Props) {
  const colors = useThemeColors();
  const progress = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors.tint, backgroundColor ?? colors.tint]
      ),
    };
  }, [backgroundColor]);

  useEffect(() => {
    if(backgroundColor) {
      progress.value = 0;
      progress.value = withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    }
  }, [backgroundColor])

  // Si aucune couleur de fond n'est défini, alors pas d'animation et affichage en colors.tint
  if(!backgroundColor) {
    return (
      <SafeAreaView style={[rootStyle, {backgroundColor: colors.tint}, style]} {...rest} />
    )
  }

  // Sinon on joue une animation pour jouer la transition entre les couleurs de fond
  return (
    <Animated.View style={[{flex: 1}, animatedStyle, style]} >
      <SafeAreaView style={rootStyle} {...rest} />
    </Animated.View>
  )
}

export default RootView;
