import React from 'react';
import { View, Text, Platform } from 'react-native';
import { styles } from './style';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>SaldoSehat</Text>
    </View>
  );
};

export default Header;
