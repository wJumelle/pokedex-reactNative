import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View, type ViewProps } from "react-native";
import Row from "../Row";
import ThemedText from "../ThemedText";

type Props = ViewProps & {
  title?: string,
  description?: string,
  image?: ImageSourcePropType
};

function PokemonSpec({ style, title, description, image, ...rest }: Props) {
  return <View style={[style,  styles.root]}>
    <Row style={styles.row}  gap={8}>
      {image && <Image source={image} width={16} height={16} />}
      <ThemedText>{title}</ThemedText>
    </Row>
    <ThemedText variant={"caption"} color={"grayMedium"}>{description}</ThemedText>
  </View>
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 4,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    height: 32
  }
});

export default PokemonSpec;
