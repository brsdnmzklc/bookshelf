import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './SigninScreen.style';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';

const SigninScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
      console.log(error);
      setLoading(false);
    }
  };
  const handleNavigation = () => {
    navigation.navigate('SignupScreen');
  };
  const forgotPassword = async () => {
    await auth().sendPasswordResetEmail(email);
    showMessage({
      message: 'Reset email send to' + email,
      type: 'success',
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookShelf</Text>
      <Text style={styles.subTitle}>Login</Text>
      <Text style={styles.text}>Please signin to continue</Text>
      <Input
        title="Email"
        placeholder="Email"
        onChange={setEmail}
        name="email"
      />
      <Input
        placeholder="Password"
        onChange={setPassword}
        isSecure={true}
        name="lock"
      />
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={forgotPassword}>
        <Text style={styles.subText}>Forgot Password?</Text>
      </TouchableOpacity>
      <Button title="Login" onPress={handleSubmit} loading={loading} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.txt}>Don't have an account? Please</Text>
        <TouchableOpacity onPress={handleNavigation}>
          <Text style={styles.subTxt}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SigninScreen;
