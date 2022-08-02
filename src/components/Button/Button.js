import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import styles from './Button.style';
const Button = ({title, onPress, loading}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {loading ? (
        <ActivityIndicator size={20} color="#1F1D36" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
