import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps & {
  gap?: number
}

function Row({style, gap, ...rest}: Props) {
  return (
    <View style={[rowStyle, style, gap ? {gap: gap} : undefined]} {...rest}></View>
  )
}

const rowStyle = {
  flex: 0, // ça prend le minimum espace possible
  flexDirection: 'row',
  alignItems: 'center'
} satisfies ViewStyle;

export default Row;
