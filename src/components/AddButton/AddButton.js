import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './AddButton.style';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
const AddButton = ({title, image, id, name, list}) => {
  const uid = auth().currentUser.uid;
  const lst = useSelector(e => e[list]);

  const add = () => {
    let a = false;
    if (lst !== undefined) {
      lst.forEach(e => {
        if (e.content.id === id) {
          a = true;
        }
      });
    }
    if (a === false) {
      database().ref(`bookshelf/users/${uid}/${list}/`).push({
        id: id,
        image: image,
        name: name,
      });
      showMessage({
        message: `Added to ${list}`,
        type: 'success',
      });
    }
    if (a === true) {
      showMessage({
        message: 'its already added',
        type: 'warning',
      });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={add}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
export default AddButton;
