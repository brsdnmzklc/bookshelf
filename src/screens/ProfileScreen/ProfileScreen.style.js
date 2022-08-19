import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../assets/COLORS';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  imageContainer: {
    margin: 10,
  },
  coverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.secondColor,
  },
  coverImage: {
    height: 200,
    width: '100%',
  },
  profileContainer: {
    marginTop: height / 6,
    alignItems: 'center',
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 150 / 2,
    justifyContent: 'center',
  },
  username: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  listContainer: {
    margin: 10,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  logout: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
});
