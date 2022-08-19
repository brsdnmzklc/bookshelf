import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from './Modal.style';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Modals = ({isVisible, onChange, onClose, onSend, imagePick, image}) => {
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.cancel} onPress={() => onClose()}>
          <Icon name="close-circle-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          {image ? (
            <Image
              source={{uri: image}}
              resizeMode="contain"
              style={styles.image}
            />
          ) : null}
          <TextInput
            placeholder="Your Message"
            onChangeText={onChange}
            placeholderTextColor="#fff"
            style={{color: '#FFFFFF'}}
            multiline
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={imagePick}>
            <Icon name="image-plus" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSend}>
            <Icon name="send" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Modals;
