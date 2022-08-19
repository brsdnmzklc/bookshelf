import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import styles from './SocialScreen.style';
import Modals from '../../components/Modal/Modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';
import PostCard from '../../cards/PostCard/PostCard';
const SocialScreen = ({navigation}) => {
  const uid = auth().currentUser.uid;
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState(null);
  const [content, setContent] = useState(null);
  const [visible, setVisible] = useState(false);
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
        setUsername(snapshot.val());
      });
  }, []);
  useEffect(() => {
    database()
      .ref('/post/')
      .on('value', snapshot => {
        const data = parsedData(snapshot.val());
        setPosts(data);
      });
  }, []);
  const options = {
    mediaType: 'photo',
    maxWidth: 200,
    maxHeight: 200,
    quality: 0.5,
    saveToPhotos: true,
  };
  const imagePick = () => {
    launchImageLibrary(options, res => {
      res.didCancel ? '' : setImage(res.assets[0].uri);
    });
  };
  console.log(posts);
  const onClose = () => {
    setVisible(!visible);
    setImage(null);
  };
  const onSend = async () => {
    await database().ref('post/').push({
      image: image,
      content: content,
      likeCount: 0,

      username: username,
      uid: uid,
    });
    setVisible(!visible);
    showMessage({
      message: 'sent',
      type: 'success',
    });
  };
  return (
    <View style={styles.container}>
      <Modals
        isVisible={visible}
        onClose={onClose}
        onChange={setContent}
        onSend={onSend}
        imagePick={imagePick}
        image={image}
      />
      {posts ? (
        <FlatList
          data={posts}
          renderItem={({item}) => {
            return <PostCard item={item} navigation={navigation} />;
          }}
        />
      ) : null}
      <TouchableOpacity onPress={onClose} style={styles.icon}>
        <Icon name="tooltip-plus-outline" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default SocialScreen;
