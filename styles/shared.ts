import { StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";

export const colors = {
  primary: "#87caeb",
  accent: "#3e54cf",
  danger: "#f70000",
  edit: "#194fff",
  white: "#ffffff",
  black: "#000000",
};

export const sharedStyles = StyleSheet.create({
  DeleteButton: {
    borderRadius: 7,
    backgroundColor: colors.danger,
    width: 40,
    height: 40,
    justifyContent: "center",
  },

  EditButton: {
    borderRadius: 7,
    backgroundColor: colors.edit,
    width: 40,
    height: 40,
    justifyContent: "center",
  },

  AddButton: {
    borderRadius: 40,
    backgroundColor: colors.accent,
    width: 60,
    height: 60,
    justifyContent: "center",
  },

  CancelButton: {
    borderRadius: 10,
    backgroundColor: colors.danger,
    width: 100,
    height: 30,
    justifyContent: "center",
  },

  TextButton: {
    textAlign: "center",
    color: colors.white,
  },

  TextInput: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 15,
  },

  TextFlatList: {
    color: colors.black,
    height: 80,
    fontSize: 20,
    textAlign: "left",
    verticalAlign: "middle",
  },

  FlatListRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },

  FlatListContainer: {
    borderRadius: 10,
  },

  ModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  Modal: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  ModalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },

  CheckboxContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
  },

  Checkbox: {
    width: 40,
    height: 40,
  },

  inputContainer: {
    gap: 4,
    backgroundColor: colors.primary,
    padding: 5,
    width: '60%'
  },

  dropdown: {
    backgroundColor: colors.white,
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    borderRadius: 15,
  },

  TextTabs: {
    textAlign: "center",
    color: "#000000",
    fontSize: 20,
    backgroundColor: "#87caeb",
    fontWeight: "bold",
  },

  Flatlist: {
    paddingHorizontal: 20,
    backgroundColor: "#87caeb",
  },

  addContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#87caeb",
    width: '100%',
    columnGap: 8,
  },

  FlatListTextContainer: {
    flex: 1,
  },

  FlatListButtonContainer: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
    width: 130,
  },
  DateContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    height: 40,
    borderRadius: 15,
    backgroundColor: colors.primary,
  },

  DateButton: {
    width: 140,
    height: 40,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 5,
  },

  CalendarModal: {
    width: '100%',
    height: '66%',
    borderRadius: 10,
  },

  AgendaContainer: {
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});
