import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Test.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    padding: 24
  }
});
