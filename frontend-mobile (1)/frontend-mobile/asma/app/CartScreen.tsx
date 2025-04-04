import React from 'react';
import { useRouter } from 'expo-router';
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { 
  incrementQuantity, 
  decrementQuantity, 
  removeFromCart 
} from '../redux/cartSlice';

export default function CartScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const navigateToPayment = () => {
    router.push('/paymentPage');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    cartItemsContainer: {
      flex: 1,
    },
    cartItem: {
      flexDirection: 'row',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      marginBottom: 10,
    },
    cartItemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 15,
    },
    cartItemDetails: {
      flex: 1,
    },
    cartItemName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5,
    },
    cartItemPrice: {
      fontSize: 14,
      color: '#666',
    },
    cartItemQuantity: {
      fontSize: 14,
      color: '#666',
      marginLeft: 10,
    },
    quantityControls: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    quantityButton: {
      backgroundColor: '#4CAF50',
      padding: 8,
      borderRadius: 4,
      marginHorizontal: 10,
    },
    quantityButtonText: {
      color: 'white',
      fontSize: 16,
    },
    removeButton: {
      backgroundColor: '#ff4444',
      padding: 8,
      borderRadius: 4,
      marginTop: 10,
    },
    removeButtonText: {
      color: 'white',
      textAlign: 'center',
    },
    subtotalContainer: {
      padding: 15,
      backgroundColor: '#f8f8f8',
      borderRadius: 8,
      marginVertical: 15,
    },
    subtotalText: {
      fontSize: 18,
      fontWeight: '600',
    },
    checkoutButton: {
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    checkoutText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Cart</Text>

      <ScrollView style={styles.cartItemsContainer}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.cartItemImage} />

            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>{item.price.toFixed(2)} DT</Text>
              
              <View style={styles.quantityControls}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => dispatch(decrementQuantity(item))}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                
                <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => dispatch(incrementQuantity(item))}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => dispatch(removeFromCart(item))}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Total: {totalAmount.toFixed(2)} DT</Text>
      </View>

      <TouchableOpacity 
        style={styles.checkoutButton} 
        onPress={navigateToPayment}
      >
        <Text style={styles.checkoutText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

// Add your existing styles here
