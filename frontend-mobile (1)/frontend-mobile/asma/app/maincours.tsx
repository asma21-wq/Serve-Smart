import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

// Define the main course item type
interface MainCourseItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any;
}

// Create an array of main course items
const mainCourseItems: MainCourseItem[] = [
  {
    id: 'm1',
    name: 'Spaghetti Bolognese',
    description: 'Classic Italian pasta with a rich tomato-based meat sauce, served with Parmesan cheese.',
    price: 8.99,
    image: require('../assets/images/spagetti.jpg')
  },
  {
    id: 'm2',
    name: 'Creamy Alfredo Pasta',
    description: 'Fettuccine pasta tossed in a creamy Alfredo sauce with grilled chicken and parsley.',
    price: 9.49,
    image: require('../assets/images/pasta.jpg')
  },
  {
    id: 'm3',
    name: 'Grilled Steak',
    description: 'Juicy grilled steak seasoned with herbs, served with a side of roasted vegetables.',
    price: 12.99,
    image: require('../assets/images/steak.jpg')
  },
  {
    id: 'm4',
    name: 'Pan-Seared Salmon',
    description: 'Fresh salmon fillet, pan-seared to perfection, served with lemon butter sauce and mashed potatoes.',
    price: 13.49,
    image: require('../assets/images/salmon.jpg')
  }
];

const MaincoursPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Main courses');

  const navigateToCart = () => {
    router.push('/CartScreen');
  };

  const navigateToProfile = () => {
    router.push('/profilePage');
  };

  const navigateToHome = () => {
    router.push('/(tabs)');
  };

  const categories = [
    { name: 'Drinks', route: '/drinks' },
    { name: 'Main courses', route: '/maincours' },
    { name: 'Desserts', route: '/Desserts' },
    { name: 'Brunches', route: '/brunches' },
  ];

  const handleAddToCart = (mainCourse: MainCourseItem) => {
    dispatch(addToCart({
      id: mainCourse.id,
      name: mainCourse.name,
      price: mainCourse.price,
      image: mainCourse.image
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={navigateToCart}>
            <Text style={styles.icon}>🛒</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToProfile}>
            <Text style={styles.icon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Header */}
      <View style={styles.categoryHeader}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={activeCategory === category.name ? styles.activeCategory : styles.inactiveCategory}
            onPress={() => {
              setActiveCategory(category.name);
              router.push(category.route);
            }}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Title */}
      <TouchableOpacity onPress={navigateToHome}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Main Courses List */}
      <View style={styles.drinksList}>
        {mainCourseItems.map((mainCourse) => (
          <View key={mainCourse.id} style={styles.drinkCard}>
            <Image
              source={mainCourse.image}
              style={styles.drinkImage}
            />
            <View style={styles.drinkDetails}>
              <Text style={styles.drinkTitle}>{mainCourse.name}</Text>
              <Text style={styles.drinkDescription}>{mainCourse.description}</Text>
              <Text style={styles.drinkPrice}>{mainCourse.price.toFixed(2)} DT</Text>

              {/* Show quantity if item is in cart */}
              {cartItems.find(item => item.id === mainCourse.id) && (
                <Text style={styles.inCartText}>
                  In Cart: {cartItems.find(item => item.id === mainCourse.id)?.quantity}
                </Text>
              )}

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(mainCourse)}
              >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Add inCartText to your existing styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingLeft: 15,
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
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#4CAF50',
  },
  activeCategory: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  inactiveCategory: {
    opacity: 0.5,
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    padding: 20,
  },
  drinksList: {
    paddingHorizontal: 20,
  },
  drinkCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  drinkImage: {
    width: 100,
    height: 100,
  },
  drinkDetails: {
    flex: 1,
    padding: 10,
  },
  drinkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  drinkDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  drinkPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  addToCartButton: {
    backgroundColor: '#2F470F', // Green color for the button
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inCartText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  }
});

export default MaincoursPage;
