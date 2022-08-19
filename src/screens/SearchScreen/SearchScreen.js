import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import styles from './SearchScreen.style';
import Input from '../../components/Input/Input';
import SearchCard from '../../cards/SearchCard/SearchCard';
import axios from 'axios';

const SearchScreen = ({navigation}) => {
  const [text, setText] = useState('');
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchBook = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}`,
        {
          headers: {
            key: 'AIzaSyCOweZRkff82rXh1s-OZIOE7VeNFw6pOsA',
          },
        },
      );
      setBooks(response.data.items);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    searchBook();
    if (text === '') {
      setBooks(null);
    }
  }, [text]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search Book"
        name="book-search-outline"
        onChange={setText}
      />
      {!loading ? (
        <FlatList
          data={books}
          renderItem={({item}) => {
            return <SearchCard item={item} navigation={navigation} />;
          }}
        />
      ) : (
        <ActivityIndicator size={50} color="#FFFF" />
      )}
    </View>
  );
};

export default SearchScreen;
