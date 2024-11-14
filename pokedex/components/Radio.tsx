import useThemeColors from "@/hooks/useThemeColors";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  checked: boolean
}

function Radio({ checked }: Readonly<Props>) {
  const colors = useThemeColors();

  return (
    <View style={[styles.radio, { borderColor: colors.tint }]}>
      {checked && <View style={[styles.radioInner, { backgroundColor: colors.tint }]}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  radio: {
    width: 14,
    height: 14,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  radioInner: {
   width: 5,
   height: 5,
   borderRadius: 5
  }
});

export default Radio;
