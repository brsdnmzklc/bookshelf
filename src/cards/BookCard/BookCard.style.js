import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: width / 5,
    height: height / 6,
    margin: 10,
    borderRadius: 10,
  },
});
