import useThemeColors from "@/hooks/useThemeColors";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  value: "id" | "name",
  onChange: (v: "id" | "name") => void
}

function SortButton({ value, onChange }: Props) {
  const colors = useThemeColors();
  const [ isModalVisible, setModalVisibility ] = useState(false);
  const onButtonPress = () => {
    setModalVisibility(true);
  }
  const onClose = () => {
    setModalVisibility(false);
  }

  return (
    <>
      <Pressable onPress={onButtonPress}>
        <View style={[styles.button, { backgroundColor: colors.grayWhite }]}>
          <Image source={
            value === "id" ?
            require("@/assets/images/number--red.png") :
            require("@/assets/images/alpha--red.png")
          } width={16} height={16} />
        </View>
      </Pressable>
      <Modal transparent visible={isModalVisible} onRequestClose={onClose} animationType="fade">
        <Text>Hello World</Text>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    width: 32,
    height: 32,
    flex: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SortButton;
