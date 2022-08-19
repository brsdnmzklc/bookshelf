import React, {useEffect, useState} from 'react';
import AppProvider from './src/context/Provider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignupScreen from './src/screens/auth/SignupScreen/SignupScreen';
import SigninScreen from './src/screens/auth/SigninScreen/SigninScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import BookDetailScreen from './src/screens/BookDetailScreen/BookDetailScreen';
import SearchScreen from './src/screens/SearchScreen/SearchScreen';
import auth from '@react-native-firebase/auth';
import FlashMessage from 'react-native-flash-message';
import SocialScreen from './src/screens/SocialScreen/SocialScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import UserScreen from './src/screens/UserScreen/UserScreen';
import ListDetailScreen from './src/screens/ListDetailScreen/ListDetailScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
};
const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
};
const SocialStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SocialScreen" component={SocialScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="ListDetail" component={ListDetailScreen} />
    </Stack.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="ListDetail" component={ListDetailScreen} />
    </Stack.Navigator>
  );
};

const Router = () => {
  const [userSession, setUserSession] = useState(null);
  useEffect(() => {
    auth().onAuthStateChanged(s => setUserSession(s));
  }, []);
  return (
    <NavigationContainer>
      {userSession ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: '#E9A6A6',
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({focused}) =>
                focused ? (
                  <Icon name="home" size={30} color="#ffffff" />
                ) : (
                  <Icon name="home" size={30} color="#1F1D36" />
                ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
              tabBarIcon: ({focused}) =>
                focused ? (
                  <Icon name="magnify" size={30} color="#ffffff" />
                ) : (
                  <Icon name="magnify" size={30} color="#1F1D36" />
                ),
            }}
          />
          <Tab.Screen
            name="Social"
            component={SocialStack}
            options={{
              tabBarIcon: ({focused}) =>
                focused ? (
                  <Icon name="compass" size={30} color="#ffffff" />
                ) : (
                  <Icon name="compass" size={30} color="#1F1D36" />
                ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              tabBarIcon: ({focused}) =>
                focused ? (
                  <Icon name="account" size={30} color="#ffffff" />
                ) : (
                  <Icon name="account" size={30} color="#1F1D36" />
                ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SigninScreen" component={SigninScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
      )}
      <FlashMessage position="bottom" />
    </NavigationContainer>
  );
};

export default () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};
