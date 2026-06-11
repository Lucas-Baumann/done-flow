import { StyleSheet } from 'react-native';
import { sharedStyles } from '../../styles/shared';

const localStyles = StyleSheet.create({
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },

  Text: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 15,
  },

  Modal: {
    margin: 20,
    backgroundColor: '#87caeb',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 30,
  },

  ModalButtonContainer: {
    backgroundColor: '#87caeb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modaladdButton: {
    borderRadius: 7,
    backgroundColor: '#3e54cf',
    width: 100,
    height: 30,
    justifyContent: 'center',
  },

  category: {
    backgroundColor: '#00d9ff',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 3,
    marginTop: 11,
  },

  categoryText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export const styles = { ...sharedStyles, ...localStyles };
