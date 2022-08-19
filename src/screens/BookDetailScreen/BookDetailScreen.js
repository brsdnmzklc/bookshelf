import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import styles from './BookDetailScreen.style';
import AddButton from '../../components/AddButton/AddButton';

const BookDetailScreen = ({route}) => {
  const book = route.params.book;
  const id = route.params.id;

  const publishedDate = (str, newStr = '', i = 0) => {
    if (str === undefined) {
      return;
    }
    if (i === 4) {
      return newStr;
    }
    newStr = newStr + str[i];
    return publishedDate(str, newStr, i + 1);
  };

  return (
    <View style={styles.container}>
      {book ? (
        <>
          <View style={styles.infoContainer}>
            {book.imageLinks ? (
              <Image
                source={{uri: book.imageLinks.thumbnail}}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <ActivityIndicator size={20} color="#fff" />
            )}
            <View style={{flex: 1}}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.text}>
                  {publishedDate(book.publishedDate)}
                </Text>
              </View>
              <Text style={styles.authors}>{book.authors}</Text>
              {book.pageCount ? (
                <Text style={styles.text}>{book.pageCount} pages</Text>
              ) : null}
              <View style={styles.buttonContainer}>
                <AddButton
                  title="Add to Readlist"
                  image={book.imageLinks.thumbnail}
                  id={id}
                  name={book.title}
                  list="readlist"
                />

                <AddButton
                  title="Add to Favorites"
                  image={book.imageLinks.thumbnail}
                  id={id}
                  name={book.title}
                  list="favorites"
                />
              </View>
            </View>
          </View>
          <ScrollView style={styles.description}>
            <Text style={styles.text}>{book.description}</Text>
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator color="#fff" size={30} />
      )}
    </View>
  );
};

export default BookDetailScreen;
