import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      
      {itemInCart && (
        <Text style={styles.inCart}>
          In Cart: {itemInCart.quantity}
        </Text>
      )}

      <Pressable
        style={styles.addButton}
        onPress={() => dispatch(addToCart(item))}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  price: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
  },
  inCart: {
    color: 'green',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default Product; 