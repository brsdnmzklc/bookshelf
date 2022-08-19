import {StyleSheet} from 'react-native';
import COLORS from '../../assets/COLORS';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  modal: {
    justifyContent: 'flex-end',
  },
  icon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
