import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Shopping Cart ({cart.totalQuantity} items)</Text>

        {cart.items.length === 0 ? (
          <Text style={styles.emptyCart}>Your cart is empty</Text>
        ) : (
          <>
            {cart.items.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                </View>

                <View style={styles.quantityContainer}>
                  <Pressable
                    onPress={() => dispatch(decrementQuantity(item))}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </Pressable>
                  
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  
                  <Pressable
                    onPress={() => dispatch(incrementQuantity(item))}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>
                </View>

                <View style={styles.itemFooter}>
                  <Text style={styles.totalText}>
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                  <Pressable
                    onPress={() => dispatch(removeFromCart(item))}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            ))}

            <View style={styles.summary}>
              <Text style={styles.summaryHeader}>Order Summary</Text>
              <View style={styles.summaryRow}>
                <Text>Subtotal:</Text>
                <Text>${cart.totalAmount.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text>Delivery Fee:</Text>
                <Text>$5.00</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>
                  ${(cart.totalAmount + 5).toFixed(2)}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {cart.items.length > 0 && (
        <Pressable
          style={styles.checkoutButton}
          onPress={() => dispatch(clearCart())}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  cartItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: '#007AFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '500',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '500',
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  summary: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  summaryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#34C759',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart; 