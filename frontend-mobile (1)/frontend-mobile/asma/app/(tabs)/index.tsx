import { View,TextInput, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';


const HomePage = () => {
  const router = useRouter(); // Use router for navigation
  const [searchText, setSearchText] = useState('');
  
  const navigateToCart = () => {
    router.push('/CartScreen'); // Make sure your route matches
  };
  const navigateToProfile = () => {
    router.push('/profilePage')
  };
  return (
    <ScrollView style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
      <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={navigateToCart}>
            <Text style={styles.icon}>🛒</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToProfile}  >
            <Text style={styles.icon}>👤</Text>
          </TouchableOpacity>
          
        </View>
      </View>

      {/* Heading */}
      <Text style={styles.heading}>WHICH ONE OF OUR FOOD CATEGORIES YOU WANNA TRY?</Text>

      {/* Menu */}
      <Text style={styles.menuTitle}>CATEGORIES</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/drinks')} // Navigate to Drinks page
        >
          
          <Image source={require('../../assets/images/drinks.jpg')} style={styles.menuImage} />
          <Text style={styles.menuText}>OUR DRINKS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/brunches')} // Navigate to Brunches page
        >
          <Image source={require('../../assets/images/brunches.jpg')} style={styles.menuImage} />
          <Text style={styles.menuText}>OUR BRUNCHES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/maincours')} // Navigate to Main Course page
        >
          <Image source={require('../../assets/images/main_course.jpg')} style={styles.menuImage} />
          <Text style={styles.menuText}>OUR MAIN COURSE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/Desserts')} // Navigate to Desserts page
        >
          <Image source={require('../../assets/images/desserts.jpg')} style={styles.menuImage} />
          <Text style={styles.menuText}>OUR DESSERTS</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  icon: {
    fontSize: 24,
    marginLeft: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 18,
    color: '#3A3A3A',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  menuTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  menuItem: {
    alignItems: 'center',
    marginBottom: 20,
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  menuImage: {
    width: 200,
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  menuText: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A3A3A',
  },
});

export default HomePage;
