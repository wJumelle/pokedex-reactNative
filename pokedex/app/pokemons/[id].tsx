import RootView from "@/components/RootView";
import Row from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import useThemeColors from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerBar: {
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    flex: 1
  }
});

function Pokemon() {
  const params = useLocalSearchParams() as {id: string};
  const { data: pokemon } = useFetchQuery('/pokemon/[id]', {id: params.id});
  const colors = useThemeColors();

  return (
    <RootView>
      <Row style={styles.headerBar} gap={8}>
        <Pressable onPress={router.back}>
          <Image source={require("@/assets/images/arrow_back-white.png")} width={32} height={32}></Image>
        </Pressable>
        <ThemedText variant="headline" color="grayWhite" style={styles.title}>{pokemon?.name}</ThemedText>
        <ThemedText variant="subtitle2" color="grayWhite">#{params.id.toString().padStart(3, '0')}</ThemedText>
      </Row>
    </RootView>
  )
}

export default Pokemon;
