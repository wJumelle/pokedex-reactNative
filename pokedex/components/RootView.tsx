import useThemeColors from "@/hooks/useThemeColors";
import React from "react";
import { ViewProps, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ViewProps;

const rootStyle = {
  flex: 1,
  padding: 4
} satisfies ViewStyle;

function RootView({style, ...rest}: Props) {
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[rootStyle, {backgroundColor: colors.tint}, style]} {...rest} />
  )
}

export default RootView;
