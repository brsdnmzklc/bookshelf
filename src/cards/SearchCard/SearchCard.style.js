import {StyleSheet} from 'react-native';
import COLORS from '../../assets/COLORS';
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ffff',
    padding: 15,
  },
  infoContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
  author: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  image: {
    height: 120,
    width: 70,
    borderRadius: 10,
  },
});
