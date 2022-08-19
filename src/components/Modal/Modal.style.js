import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import COLORS from '../../assets/COLORS';
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColor,
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: height / 3,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 25,
    width: width
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  send: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    marginTop: 15,
  },
  cancel: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  image: {
    height: 150,
    width: 100,
  },
});
