import React, {useState, useEffect} from 'react';
import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
import styles from './UserScreen.style';
import database from '@react-native-firebase/database';
import BookList from '../../components/BookList/BookList';

const UserScreen = ({navigation, route}) => {
  const [username, setUserName] = useState('');
  const uid = route.params.uid;
  const [favorites, setFavorites] = useState(null);
  const [readlist, setReadList] = useState(null);
  const [cover, setCover] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

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
      .ref(`bookshelf/users/${uid}/username/`)
      .on('value', snapshot => {
        setUserName(snapshot.val());
      });
    database()
      .ref(`bookshelf/users/${uid}/favorites/`)
      .on('value', snapshot => {
        setFavorites(parsedData(snapshot.val()));
      });
    database()
      .ref(`bookshelf/users/${uid}/readlist/`)
      .on('value', snapshot => {
        setReadList(parsedData(snapshot.val()));
      });
    database()
      .ref(`bookshelf/users/${uid}/pics/cover`)
      .on('value', snapshot => {
        setCover(snapshot.val());
      });
    database()
      .ref(`bookshelf/users/${uid}/pics/profilePic`)
      .on('value', snapshot => {
        setProfilePic(snapshot.val());
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.coverContainer}>
        <Image source={{uri: cover}} style={styles.coverImage} />
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          {profilePic ? (
            <Image style={styles.profilePic} source={{uri: profilePic}} />
          ) : (
            <Image
              source={require('../../assets/pp.png')}
              style={styles.profilePic}
            />
          )}
        </View>
        <Text style={styles.username}>@{username}</Text>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.text}>{username}'s Favorite Books</Text>
        <BookList
          icon={false}
          data={favorites}
          listname="readlist"
          navigation={navigation}
        />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.text}>{username}'s Readlist </Text>
        <BookList
          icon={false}
          data={readlist}
          listname="readlist"
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default UserScreen;
