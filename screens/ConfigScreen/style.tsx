import { StyleSheet } from 'react-native';
import { sharedStyles } from '../../styles/shared';

const localStyles = StyleSheet.create({
  Text: {
    textAlign: 'center',
    color: '#000000',
  },
});

export const styles = { ...sharedStyles, ...localStyles };
