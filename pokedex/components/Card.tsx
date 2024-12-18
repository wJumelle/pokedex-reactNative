import { Shadows } from "@/constants/Shadows";
import useThemeColors from "@/hooks/useThemeColors";
import React from "react";
import { View, ViewStyle, type ViewProps } from "react-native";

type Props = ViewProps;

function Card({style, ...rest}: Props) {
  const colors = useThemeColors();

  return (
    <View style={[styles, {backgroundColor: colors.grayWhite}, style]} {...rest} />
  )
}

const styles = {
  borderRadius: 8,
  ...Shadows.dp2
} satisfies ViewStyle

export default Card;
