import React, {useState, useEffect} from 'react';
import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
import styles from './ProfileScreen.style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {launchImageLibrary} from 'react-native-image-picker';
import BookList from '../../components/BookList/BookList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({navigation}) => {
  const uid = auth().currentUser.uid;
  const [username, setUserName] = useState('');
  const [favorites, setFavorites] = useState(null);
  const [readlist, setReadList] = useState(null);
  const [cover, setCover] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const options = {
    mediaType: 'photo',
    maxWidth: 200,
    maxHeight: 200,
    quality: 0.5,
    saveToPhotos: true,
  };
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
  const listDetail = (listname, uid) => {
    navigation.navigate('ListDetail', {listname: listname, uid: uid});
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
  const signOut = () => {
    auth().signOut();
  };
  const coverPick = async () => {
    await launchImageLibrary(options, res => {
      res.didCancel ? '' : setCover(res.assets[0].uri);
    });
    database().ref(`bookshelf/users/${uid}/pics/`).update({
      cover: cover,
    });
  };
  const profilePick = async () => {
    await launchImageLibrary(options, res => {
      res.didCancel ? '' : setProfilePic(res.assets[0].uri);
    });
    database().ref(`bookshelf/users/${uid}/pics/`).update({
      profilePic: profilePic,
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={coverPick} style={styles.coverContainer}>
        <Image source={{uri: cover}} style={styles.coverImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut}>
        <Icon
          name="login-variant"
          size={30}
          color="#ffff"
          style={styles.logout}
        />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.imageContainer} onPress={profilePick}>
          {profilePic ? (
            <Image style={styles.profilePic} source={{uri: profilePic}} />
          ) : (
            <Image
              source={require('../../assets/pp.png')}
              style={styles.profilePic}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.username}>@{username}</Text>
      </View>

      <View style={styles.listContainer}>
        <TouchableOpacity onPress={() => listDetail('favorites', uid)}>
          <Text style={styles.text}>{username}'s Favorite Books</Text>
        </TouchableOpacity>
        <BookList
          icon={false}
          data={favorites}
          listname="readlist"
          navigation={navigation}
        />
      </View>
      <View style={styles.listContainer}>
        <TouchableOpacity onPress={() => listDetail('readlist', uid)}>
          <Text style={styles.text}>{username}'s Readlist </Text>
        </TouchableOpacity>
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

export default ProfileScreen;
