import { ViewStyle } from "react-native";

export const Shadows = {
  dp2: {
    shadowColor: '#000',
    shadowOpacity: 0.2, //iOs
    shadowOffset: {width: 0, height: 1}, //iOs
    shadowRadius: 3, //iOs
    elevation: 2 //Android
  }
} satisfies Record<string, ViewStyle>
