import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeView from './src/views/Homeview';

const App = () => {
  return (
    <SafeAreaView style={styles.app}>
      <HomeView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
