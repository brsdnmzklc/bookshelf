import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import styles from './HomeScreen.style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import useFetch from '../../hooks/useFetch';
import BookCard from '../../cards/BookCard/BookCard';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const uid = auth().currentUser.uid;
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [popularWeek, setPopularWeek] = useState(null);
  const [nominatedBooks, setNominatedBooks] = useState(null);
  const headers = {
    'X-RapidAPI-Key': '5ea617fce0msh8de370c165b0e54p11839cjsn97ff3e316408',
    'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com',
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

  const optionsWeek = {
    method: 'GET',
    url: 'https://hapi-books.p.rapidapi.com/week/novel',
    headers: headers,
  };
  const optionsNominated = {
    method: 'GET',
    url: `https://hapi-books.p.rapidapi.com/nominees/novel/${year}`,
    headers: headers,
  };

  const {data, error, loading} = useFetch(
    `https://hapi-books.p.rapidapi.com/month/${year}/${month}`,
    headers,
  );
  console.log(error);

  useEffect(() => {
    database()
      .ref(`bookshelf/users/${uid}/username/`)
      .once('value', snapshot => setUserName(snapshot.val()));
  }, []);
  useEffect(() => {
    database()
      .ref(`bookshelf/users/${uid}/favorites/`)
      .on('value', snapshot => {
        dispatch({type: 'SET_FAVORITES', payload: parsedData(snapshot.val())});
      });
  }, []);
  useEffect(() => {
    database()
      .ref(`bookshelf/users/${uid}/readlist/`)
      .on('value', snapshot => {
        dispatch({type: 'SET_READLIST', payload: parsedData(snapshot.val())});
      });
  }, []);
  useEffect(() => {
    axios
      .request(optionsWeek)
      .then(function (response) {
        setPopularWeek(response.data);
      })
      .catch(function (e) {
        console.error(e);
      });
  });
  useEffect(() => {
    axios
      .request(optionsNominated)
      .then(function (response) {
        setNominatedBooks(response.data);
      })
      .catch(function (e) {
        console.error(e);
      });
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hello, <Text style={styles.subText}> {username}</Text>
      </Text>

      <View>
        <Text style={styles.text}>Popular Books This Month</Text>
        {loading ? (
          <ActivityIndicator size={30} color="#fff" />
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({item}) => {
              return (
                <BookCard
                  source={item.cover}
                  navigation={navigation}
                  name={item.name}
                />
              );
            }}
          />
        )}
      </View>
      <View>
        <Text style={styles.text}>Popular Books This Week</Text>
        {loading ? (
          <ActivityIndicator size={30} color="#fff" />
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularWeek}
            renderItem={({item}) => {
              return (
                <BookCard
                  source={item.cover}
                  navigation={navigation}
                  name={item.name}
                />
              );
            }}
          />
        )}
      </View>
      <View>
        <Text style={styles.text}>Nominated Books</Text>
        {loading ? (
          <ActivityIndicator size={30} color="#fff" />
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={nominatedBooks}
            renderItem={({item}) => {
              return (
                <BookCard
                  source={item.cover}
                  navigation={navigation}
                  name={item.name}
                />
              );
            }}
          />
        )}
      </View>
    </View>
  );
};
export default HomeScreen;
