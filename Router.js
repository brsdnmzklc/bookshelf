import React, {useEffect, useState} from 'react';
import AppProvider from './src/context/Provider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import SignupScreen from './src/screens/auth/SignupScreen/SignupScreen';
import SigninScreen from './src/screens/auth/SigninScreen/SigninScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import auth from '@react-native-firebase/auth';
import FlashMessage from 'react-native-flash-message';
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Router = () => {
  const [userSession, setUserSession] = useState(null);
  useEffect(() => {
    auth().onAuthStateChanged(s => setUserSession(s));
  }, []);
  return (
    <NavigationContainer>
      {userSession ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
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
