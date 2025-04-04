import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const router = useRouter();
const navigateToCart = () => {
  router.push('/CartScreen'); // Make sure your route matches
};
export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Zone verte avec le bouton retour et le texte Add Card */}
      <View style={styles.header}>
        <TouchableOpacity onPress= {navigateToCart }>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Card</Text>
      </View>
      {/* Somme à payer */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>Amount to Pay: $100.00</Text> {/* Vous pouvez remplacer cette valeur par une variable dynamique */}
      </View>

      {/* Formulaire de paiement */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Enter Your Payment Details</Text>

        {/* Card Holder Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
          />
        </View>

        {/* Card Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />
        </View>

        {/* Expiry Date and CVV */}
        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              placeholderTextColor="#888"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder=". . . ."
              placeholderTextColor="#888"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Resume Payment */}
        <View style={styles.paymentResume}>
          <Text style={styles.resumeTitle}>Payment Summary</Text>
          <View style={styles.resumeItem}>
            <Text style={styles.resumeLabel}>Total Amount:</Text>
            <Text style={styles.resumeValue}>$49.99</Text>
          </View>
          <View style={styles.resumeItem}>
            <Text style={styles.resumeLabel}>Card Type:</Text>
            <Text style={styles.resumeValue}>Visa</Text>
          </View>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { /* Logic to handle payment */ }}>
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    backgroundColor: '#2F470F', // Vert
    flexDirection: 'row',
    paddingVertical: 40,
    paddingHorizontal: 20,
    
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'center', // Centrer le texte
    flex: 1, 
  },
  formContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentResume: {
    backgroundColor: '#E3CB93', // Light blue background
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  inputCVV: {
    paddingLeft: 25,
    marginBottom:20,  // Élargir le padding à gauche pour que le texte apparaisse plus à gauche
  },
  resumeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  resumeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resumeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  resumeValue: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2F470F', // Vert
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  inputCVVContainer: {
    flex: 1, // Utiliser toute la largeur restante pour le champ CVV
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  amountText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', // Centrer le montant
  },
});