import useThemeColors from "@/hooks/useThemeColors";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";
import Card from "./Card";
import Row from "./Row";
import Radio from "./Radio";

type Props = {
  value: "id" | "name",
  onChange: (v: "id" | "name") => void
}

// Tableau permettant de simplifier l'affichage des boutons radios dans la modale
const options = [
  { label: "Number", value: "id" },
  { label: "Name", value: "name" },
] as const;

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
        <Pressable style={styles.backdrop} onPress={onClose}></Pressable>
        <View style={[styles.popup, { backgroundColor: colors.tint }]}>
          <ThemedText variant="subtitle2" color="grayWhite" style={styles.popupTitle}>Sort by: </ThemedText>
          <Card style={styles.popupCard}>
            {options.map((o) => <Pressable onPress={() => onChange(o.value)} key={o.value}>
              <Row gap={8}>
                <Radio checked={o.value === value} />
                <ThemedText color="grayDark">{o.label}</ThemedText>
              </Row>
            </Pressable>)}
          </Card>
        </View>
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
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .3)"
  },
  popup: {
    borderRadius: 12,
    padding: 4,
    paddingTop: 16,
    gap: 16
  },
  popupTitle: {
    paddingLeft: 20
  },
  popupCard: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16
  }
});

export default SortButton;
