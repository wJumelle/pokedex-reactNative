import { Colors } from "@/constants/Colors";
import useThemeColors from "@/hooks/useThemeColors";
import { StyleSheet, Text, TextProps } from "react-native";

const styles = StyleSheet.create({
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold"
  },
  subtitle1: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold"
  },
  subtitle2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold"
  },
  subtitle3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold"
  },
  body1: {
    fontSize: 14,
    lineHeight: 16
  },
  body2: {
    fontSize: 12,
    lineHeight: 16
  },
  body3: {
    fontSize: 10,
    lineHeight: 16
  },
  caption: {
    fontSize: 8,
    lineHeight: 12
  }
});

type Props = TextProps & {
  variant?: keyof typeof styles,
  color?: keyof typeof Colors['light']
}

function ThemedText({variant, color, style, ...rest}: Props) {
  // On récupère les couleurs définit dans le fichier de constantes Colors en fonction du thème dark ou light de l'utilisateur
  const colors = useThemeColors();

  // On retourne le texte stylisé à l'aide d'un tableau contenant les styles de texte
  // Et les styles de couleurs
  return <Text style={[ styles[variant ?? 'body3'], {color: colors[color ?? "grayDark"]}, style ]} {...rest} />
}

export default ThemedText;
