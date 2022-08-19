import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './ListDetailScreen.style';
import BookList from '../../components/BookList/BookList';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const ListDetailScreen = ({route, navigation}) => {
  const uid = route.params.uid;
  const [list, setList] = useState(null);
  const listname = route.params.listname;
  const parsedData = obj => {
    if (obj === null) {
      return;
    }
    return Object.keys(obj).map(e => {
      return {
        key: e,
        content: obj[e],
      };
    });
  };
  useEffect(() => {
    database()
      .ref(`bookshelf/users/${uid}/${listname}/`)
      .on('value', snapshot => {
        setList(parsedData(snapshot.val()));
      });
  }, []);

  return (
    <View style={styles.container}>
      <BookList
        data={list}
        navigation={navigation}
        listname={listname}
        horizontal={false}
        numColumns={3}
      />
    </View>
  );
};

export default ListDetailScreen;
