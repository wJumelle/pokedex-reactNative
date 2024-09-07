import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

function useThemeColors() {
  const theme = useColorScheme() ?? "light";
  return Colors[theme];
}

export default useThemeColors;
