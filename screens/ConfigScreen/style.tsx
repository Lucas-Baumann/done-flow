import { Button, FlatList, Modal, StyleSheet, TextInput } from 'react-native';

export const styles = StyleSheet.create({
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#87caeb',
    columnGap: 8,
  },

  inputContainer: {
    gap:4,
    backgroundColor: '#87caeb',
  },

  TextInput: {
    backgroundColor: '#ffffff',
    width: 300,
    borderRadius: 15,
  },

  dropdown: {
    backgroundColor: '#ffffff',
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderRadius: 15,
  },

  dropdownPlaceholder:{
    alignContent: 'center',
  },

  AddButton: {
    borderRadius: 40,
    backgroundColor: '#3e54cf',
    width: 60,
    height: 60,
    justifyContent: 'center',
  },

  CancelButton: {
    borderRadius: 10,
    backgroundColor: '#f70000',
    width: 100,
    height: 30,
    justifyContent: 'center',
  },

  CheckboxContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },

  Checkbox:{
    width: 40,
    height: 40,
  },

  DeleteButton:{
    borderRadius: 7,
    backgroundColor: '#f70000',
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  EditButton:{
    borderRadius: 7,
    backgroundColor: '#194fff',
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  Text: {
    textAlign: 'center',
    color: '#000000',
  },

  TextButton: {
    textAlign: 'center',
    color: '#ffffff',
  },

  TextFlatList: {
    color: '#000000',
    height: 80,
    fontSize: 20,
    textAlign: 'left',
    verticalAlign: 'middle',
  },

  Flatlist: {
    width: '100%',
    height: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#87caeb"
  },

  FlatListRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },

  FlatListTextContainer:{
    flex: 1,
  },

  FlatListButtonContainer: {
    flexDirection: 'row',
    columnGap: 5,    
    alignItems: 'center',
    width: 130,
  },

  FlatListContainer: {
    borderRadius: 10,
  },

  ModalView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  Modal:{
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  ModalButtonContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  }
});