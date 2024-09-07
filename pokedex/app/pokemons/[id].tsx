import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

function Pokemon() {
  const params = useLocalSearchParams();

  return (
    <View>
      <Text>Pokemon #{params.id}</Text>
    </View>
  )
}

export default Pokemon;
