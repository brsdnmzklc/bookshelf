import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },
  bodyContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  footerContainer: {
    flexDirection: 'row',

    margin: 10,
  },
  likeContainer: {
    flexDirection: 'row',
    width: 100,
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 100,
  },
  username: {
    color: '#FFFFFF',
    marginBottom: 5,
  },
  content: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  like: {
    color: '#FFFFFF',
    margin: 5,
  },
  comment: {
    color: '#FFFFFF',
    margin: 5,
  },
});
