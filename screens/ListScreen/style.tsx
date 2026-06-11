import { StyleSheet } from 'react-native';
import { sharedStyles } from '../../styles/shared';

const localStyles = StyleSheet.create({
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

  Text: {
    textAlign: 'center',
    color: '#000000',
  },

  AddButton: {
    borderRadius: 10,
    backgroundColor: '#3e54cf',
    width: 100,
    height: 30,
    justifyContent: 'center',
  },

  Flatlist: {
    flex: 1,
    borderRadius: 10,
  },

  FlatListTextContainer: {
    width: 350,
  },

  FlatListButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    width: 90,
  },
});

export const styles = { ...sharedStyles, ...localStyles };
