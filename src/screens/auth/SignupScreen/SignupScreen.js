import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './SignupScreen.style';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';

const SigninScreen = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(loading);

  const handleSubmit = async () => {
    if (email === '') {
      showMessage({
        message: "Email can't be blank",
        type: 'danger',
      });
      return;
    }
    if (password === '') {
      showMessage({
        message: "Password can't be blank",
        type: 'danger',
      });
      return;
    }
    if (username === '') {
      showMessage({
        message: "Username can't be blank",
        type: 'danger',
      });
      return;
    }
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      await database().ref(`bookshelf/users/${auth().currentUser.uid}/`).set({
        username: username,
      });
      setLoading(false);
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
      console.log(error.code);
      setLoading(false);
    }
  };
  const handleNavigation = () => {
    navigation.navigate('SigninScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookShelf</Text>
      <Text style={styles.subTitle}>Sing Up</Text>
      <Text style={styles.text}>Create an account to continue</Text>
      <Input placeholder="Username" onChange={setUserName} name="account" />
      <Input placeholder="Email" onChange={setEmail} name="email" />
      <Input
        placeholder="Password"
        onChange={setPassword}
        isSecure={true}
        name="lock"
      />
      <Button title="Sign Up" onPress={handleSubmit} loading={loading} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.txt}>Already have an account? Go to the</Text>
        <TouchableOpacity onPress={handleNavigation}>
          <Text style={styles.subTxt}>Login Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SigninScreen;
