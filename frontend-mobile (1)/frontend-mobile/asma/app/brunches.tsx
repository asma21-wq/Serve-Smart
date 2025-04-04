import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // For the icons
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
const router = useRouter();

const navigateToHome = () => {
  router.push('/(tabs)'); // Make sure your route matches
};

// Define the brunch item type
interface BrunchItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any;
}

// Create an array of brunch items
const brunchItems: BrunchItem[] = [
  {
    id: 'b1',
    name: 'Avocado Toast',
    description: 'Classic avocado toast topped with cherry tomatoes, olive oil drizzle, and a sprinkle of chili flakes.',
    price: 4.99,
    image: require('../assets/images/brunch1.jpg')
  },
  {
    id: 'b2',
    name: 'Eggs Benedict',
    description: 'Poached eggs on English muffins, topped with creamy hollandaise sauce and served with smoked salmon.',
    price: 7.50,
    image: require('../assets/images/brunch2.jpg')
  },
  {
    id: 'b3',
    name: 'Pancake Platter',
    description: 'Fluffy pancakes served with maple syrup, fresh berries, and a dollop of whipped cream.',
    price: 5.99,
    image: require('../assets/images/Pancake Platter.jpg')
  },
  {
    id: 'b4',
    name: 'Vegetarian Quiche',
    description: 'A savory tart filled with seasonal vegetables, creamy custard, and a flaky crust.',
    price: 6.49,
    image: require('../assets/images/Vegetarian Quiche.jpg')
  }
];

const BrunchesPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [activeCategory, setActiveCategory] = useState('Brunches'); // Default active category
  const navigateToCart = () => {
    router.push('/CartScreen'); // Make sure your route matches
  };
  const navigateToProfile = () => {
    router.push('/profilePage');
  };
  const categories = [
    { name: 'Drinks', route: '/drinks' },
    { name: 'Main courses', route: '/maincours' },
    { name: 'Desserts', route: '/Desserts' },
    { name: 'Brunches', route: '/brunches' },
  ];

  const handleAddToCart = (brunch: BrunchItem) => {
    dispatch(addToCart({
      id: brunch.id,
      name: brunch.name,
      price: brunch.price,
      image: brunch.image
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
      <TouchableOpacity onPress= {navigateToHome }>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      {/* Brunch List */}
      <View style={styles.brunchList}>
        {brunchItems.map((brunch) => (
          <View key={brunch.id} style={styles.brunchCard}>
            <Image
              source={brunch.image}
              style={styles.brunchImage}
            />
            <View style={styles.brunchDetails}>
              <Text style={styles.brunchTitle}>{brunch.name}</Text>
              <Text style={styles.brunchDescription}>{brunch.description}</Text>
              <Text style={styles.brunchPrice}>{brunch.price.toFixed(2)} DT</Text>
              
              {/* Show quantity if item is in cart */}
              {cartItems.find(item => item.id === brunch.id) && (
                <Text style={styles.inCartText}>
                  In Cart: {cartItems.find(item => item.id === brunch.id)?.quantity}
                </Text>
              )}

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(brunch)}
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
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  inactiveCategory: {
    padding: 10,
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
  brunchList: {
    paddingHorizontal: 20,
  },
  brunchCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  brunchImage: {
    width: 100,
    height: 100,
  },
  brunchDetails: {
    flex: 1,
    padding: 10,
  },
  brunchTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  brunchDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  brunchPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  addToCartButton: {
    backgroundColor: '#2F470F',
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

export default BrunchesPage;
