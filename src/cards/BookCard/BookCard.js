import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import useFetch from '../../hooks/useFetch';
import styles from './BookCard.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';
showMessage;
const BookCard = ({source, navigation, name, icon, keys, listname}) => {
  let book = null;
  let id = null;
  const uid = auth().currentUser.uid;
  const dispatch = useDispatch();
  const headers = {
    key: 'AIzaSyCOweZRkff82rXh1s-OZIOE7VeNFw6pOsA',
    langRestrict: 'en',
  };

  const {data, loading, error} = useFetch(
    `https://www.googleapis.com/books/v1/volumes?q=${name}`,
    headers,
  );
  if (data) {
    book = data.items[0].volumeInfo;
    id = data.items[0].id;
  }
  const onPress = () => {
    navigation.navigate('BookDetail', {
      book: book,
      id: id,
    });
  };
  console.log(uid);
  const remove = async () => {
    if (listname === 'favorites') {
      dispatch({type: 'REMOVE_FAVORITES', payload: keys});
      await database()
        .ref(`bookshelf/users/${uid}/${listname}/${keys}`)
        .remove();
      showMessage({
        message: `removed from ${listname}`,
        type: 'success',
      });
    }
    if (listname === 'readlist') {
      dispatch({type: 'REMOVE_READLIST', payload: keys});
      await database()
        .ref(`bookshelf/users/${uid}/${listname}/${keys}`)
        .remove();
      showMessage({
        message: `removed from ${listname}`,
        type: 'success',
      });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? (
        <TouchableOpacity onPress={remove}>
          <Icon name="close-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>
      ) : null}
      <Image source={{uri: source}} style={styles.image} />
    </TouchableOpacity>
  );
};
export default BookCard;
