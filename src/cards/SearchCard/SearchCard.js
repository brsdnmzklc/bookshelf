import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import styles from './SearchCard.style';

const SearchCard = ({item, navigation}) => {
  const publishedDate = (str, newStr = '', i = 0) => {
    if (str === undefined) {
      return;
    }
    if (i <= 4) {
      return newStr;
    }
    newStr = newStr + str[i];
    return publishedDate(str, newStr, i + 1);
  };
  const onPress = () => {
    navigation.navigate('BookDetail', {
      book: item.volumeInfo,
      id: item.id,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {item.volumeInfo.imageLinks ? (
        <Image
          source={{uri: item.volumeInfo.imageLinks.thumbnail}}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <ActivityIndicator size={20} color="#fff" />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {item.volumeInfo.title} {publishedDate(item.volumeInfo.publishedDate)}
        </Text>
        <Text style={styles.author}>{item.volumeInfo.authors}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;
