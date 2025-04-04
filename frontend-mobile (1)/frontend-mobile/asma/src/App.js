import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Cart from './components/Cart';
import MainCourse from './components/MainCourse';
import Drinks from './components/Drinks';
import Desserts from './components/Desserts';
import Brunches from './components/Brunches';

const App = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.menuContainer}>
        <MainCourse />
        <Drinks />
        <Brunches />
        <Desserts />
      </ScrollView>
      <Cart />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  menuContainer: {
    flex: 1,
    padding: 10,
  }
});

export default App; 