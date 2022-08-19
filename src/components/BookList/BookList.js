import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './BookList.style';
import BookCard from '../../cards/BookCard/BookCard';
const BookList = ({
  navigation,
  data,
  listname,
  icon = true,
  horizontal = true,
  numColumns,
}) => {
  return (
    <View>
      <FlatList
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        numColumns={numColumns}
        data={data}
        renderItem={({item}) => {
          return (
            <BookCard
              source={item.content.image}
              name={item.content.name}
              navigation={navigation}
              icon={icon}
              keys={item.key}
              listname={listname}
            />
          );
        }}
      />
    </View>
  );
};

export default BookList;
