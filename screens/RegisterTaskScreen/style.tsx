import { StyleSheet } from "react-native";
import { sharedStyles } from "../../styles/shared";

const localStyles = StyleSheet.create({
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
  },

  Text: {
    textAlign: "center",
    color: "#000000",
    fontSize: 15,
  },

  ModalButtonContainer: {
    backgroundColor: "#87caeb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  modaladdButton: {
    borderRadius: 7,
    backgroundColor: "#3e54cf",
    width: 100,
    height: 30,
    justifyContent: "center",
  },

  category: {
    backgroundColor: "#00d9ff",
    borderRadius: 10,
    justifyContent: "center",
    padding: 3,
    marginTop: 11,
  },

  categoryText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const styles = { ...sharedStyles, ...localStyles };
