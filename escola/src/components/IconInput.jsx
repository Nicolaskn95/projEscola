import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commomStyles from '../commomStyles';

const IconInput = ({ icon, placeholder, value, onChangeText, secureTextEntry }) => {

    const [isFocused, setIsFocused] = useState(false)

   const handleFocus = () => {
        setIsFocused(true)
    }

   const handleBlur = () => {
        setIsFocused(false)
    }

  return (
    <View style={[styles.container, isFocused && styles.inputBorder]}>
      <Icon name={icon} size={20} style={styles.icon} />
      <TextInput
        style={[styles.input]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginBottom: 10,
  },
  inputBorder: {
    borderWidth: 2,
    borderColor: '#DC1E45'
  },
  icon: {
    color: 'gray',
    marginLeft: 10,
  },
  input: {
    fontFamily: commomStyles.fontFamily,
    flex: 1,
    marginLeft: 10,
  },
});

export default IconInput;
