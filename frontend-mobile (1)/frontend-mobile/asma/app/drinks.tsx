import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // For the icons
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

// Define the drink item type
interface DrinkItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any; // for require('../assets/images/...')
}

const drinks: DrinkItem[] = [
  {
    id: 'd1',
    name: 'Lemon Basil Lemonade',
    description: 'Classic lemonade with a twist of fresh basil leaves, delivering a unique blend of sweetness and herbal notes.',
    price: 1.99,
    image: require('../assets/images/lemonade.jpg')
  },
  {
    id: 'd2',
    name: 'Green Apple Detox',
    description: 'Green smoothie with a blend of fresh apples, cinnamon, and herbal notes for a refreshing detox experience.',
    price: 1.69,
    image: require('../assets/images/apple_detox.jpg')
  },
  // ... add other drinks
];

const DrinksPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Drinks'); // Default active category
  const navigateToProfile = () => {
    router.push('/profilePage')
  };
  const categories = [
    { name: 'Drinks', route: '/drinks' },
    { name: 'Main courses', route: '/maincours' },
    { name: 'Desserts', route: '/Desserts' },
    { name: 'Brunches', route: '/brunches' },
  ];

  const handleCategoryPress = (categoryName: string, route: string) => {
    setActiveCategory(categoryName); // Set active category
    router.push(route); // Navigate to the selected page
  };
  const navigateToCart = () => {
    router.push('/CartScreen'); // Make sure your route matches
  };

  const handleAddToCart = (drink: DrinkItem) => {
    dispatch(addToCart({
      id: drink.id,
      name: drink.name,
      price: drink.price,
      image: drink.image
    }));
  };

  const navigateToHome = () => {
    router.push('/(tabs)');
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
          <TouchableOpacity onPress={navigateToProfile}  >
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
            onPress={() => handleCategoryPress(category.name, category.route)}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Title */}
      <TouchableOpacity onPress= {navigateToHome }>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      {/* Drinks List */}
      <View style={styles.drinksList}>
        {drinks.map((drink) => (
          <View key={drink.id} style={styles.drinkCard}>
            <Image
              source={drink.image}
              style={styles.drinkImage}
            />
            <View style={styles.drinkDetails}>
              <Text style={styles.drinkTitle}>{drink.name}</Text>
              <Text style={styles.drinkDescription}>{drink.description}</Text>
              <Text style={styles.drinkPrice}>{drink.price.toFixed(2)} DT</Text>
              
              {/* Show quantity if item is in cart */}
              {cartItems.find(item => item.id === drink.id) && (
                <Text style={styles.inCartText}>
                  In Cart: {cartItems.find(item => item.id === drink.id)?.quantity}
                </Text>
              )}

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(drink)}
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

// Styles
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

export default DrinksPage;
