import {StyleSheet} from 'react-native';
import COLORS from '../../assets/COLORS';
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColor,
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    height: 200,
    width: 150,
  },
  text: {
    color: '#FFFFFF',
  },
  description: {
    margin: 20,
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  authors: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});
