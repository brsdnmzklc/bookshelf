import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../assets/COLORS';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    margin: 10,
  },
  subText: {
    color: COLORS.secondColor,
  },
});
