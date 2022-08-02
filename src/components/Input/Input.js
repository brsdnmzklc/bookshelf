import React from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './Input.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({name, placeholder, onChange, isSecure}) => {
  return (
    <View style={styles.container}>
      <Icon name={name} size={20} />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onChange}
        secureTextEntry={isSecure}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
      />
    </View>
  );
};

export default Input;
