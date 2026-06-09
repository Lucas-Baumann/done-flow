import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#87caeb',
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },

  TextInput: {
    backgroundColor: '#ffffff',
    width: 300,
    borderRadius: 10,
  },

  AddButton: {
    borderRadius: 10,
    backgroundColor: '#3e54cf',
    width: 100,
    height: 30,
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
    width: 500,
    height: 60,
    borderRadius: 10,
  },

  FlatListRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },

  FlatListTextContainer:{
    width: 350,
  },

  FlatListButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    width: 90,
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