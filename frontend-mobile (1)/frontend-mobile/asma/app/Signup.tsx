import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up!</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Table Number"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.startText}>To start your order please </Text>
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => router.push('/(tabs)')}
      >
        
        <Text style={styles.loginButtonText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Image
          source={require('../assets/images/1 (1).png')}
          style={styles.footerLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#46783E',
    marginTop: 120,
    marginBottom: 40,
  },
  startText:{
    fontSize: 16,
    color: '#46783E',
    marginBottom: 0,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,           // Add border
    borderColor: '#46783E',   // Border color
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#46783E',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerLogo: {
    width: 150,
    height: 50,
  },
});