import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './PostCard.style';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
const PostCard = ({item, navigation}) => {
  const image = item.content.image;
  const uid = auth().currentUser.uid;
  const [isLike, setIsLike] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const like = () => {
    database()
      .ref(`post/${item.key}/`)
      .update({
        likeCount: item.content.likeCount + 1,
      });
    setIsLike(!isLike);
  };
  const dislike = () => {
    database()
      .ref(`post/${item.key}/`)
      .update({
        likeCount: item.content.likeCount - 1,
      });
    setIsLike(!isLike);
  };
  useEffect(() => {
    if (uid === item.content.uid) {
      setIsMine(true);
    }
  }, []);
  const remove = () => {
    database().ref(`post/${item.key}/`).remove();
  };
  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserScreen', {uid: item.content.uid});
          }}>
          <Text style={styles.username}>@{item.content.username} </Text>
        </TouchableOpacity>
        <Text style={styles.content}>{item.content.content} </Text>
        <View style={styles.footerContainer}>
          <View style={styles.likeContainer}>
            <Text style={styles.like}>{item.content.likeCount} </Text>
            {!isLike ? (
              <TouchableOpacity onPress={like}>
                <Icon name="thumb-up-outline" size={20} color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={dislike}>
                <Icon name="thumb-up" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
          {isMine ? (
            <TouchableOpacity onPress={remove}>
              <Icon name="delete-empty-outline" size={25} color="#fff" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.imageContainer}>
        {image ? <Image source={{uri: image}} style={styles.image} /> : null}
      </View>
    </View>
  );
};
export default PostCard;
