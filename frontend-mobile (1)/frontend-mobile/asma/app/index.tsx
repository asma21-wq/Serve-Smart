import React, { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, StatusBar } from 'react-native';

export default function Welcome() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const handleSplashDismiss = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setShowSplash(false));
  }, [fadeAnim]);

  const renderSplashScreen = () => (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity 
        style={styles.splashContent} 
        onPress={handleSplashDismiss} 
        activeOpacity={0.9}
      >
        <View style={styles.splashTextContainer}>
          <Text style={styles.splashTitle}>Welcome!</Text>
          <Text style={styles.splashSubtitle}>Tap to explore culinary magic</Text>
        </View>
        <Image
          source={require('../assets/images/1 (1).png')}
          style={styles.splashLogo}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderMainScreen = () => (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.contentContainer}>
        <Text style={styles.quoteText}>
          "Cooking is like love, it should be entered into with abandon or not at all"
        </Text>
        <Text style={styles.inviteText}>
          Join us for an unforgettable culinary journey
        </Text>
        
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={() => router.push('/Signup')}
        >
          <Text style={styles.ctaButtonText}>Let's Start</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Image
          source={require('../assets/images/1 (1).png')}
          style={styles.footerLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );

  return showSplash ? renderSplashScreen() : renderMainScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 50,
  },
  splashTextContainer: {
    alignItems: 'center',
  },
  splashTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: '#46783E',
    marginBottom: 10,
  },
  splashSubtitle: {
    fontSize: 18,
    color: '#46783E',
    opacity: 0.7,
  },
  splashLogo: {
    width: 250,
    height: 250,
    opacity: 0.8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  quoteText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#46783E',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  inviteText: {
    fontSize: 18,
    color: '#46783E',
    textAlign: 'center',
    marginBottom: 40,
  },
  ctaButton: {
    backgroundColor: '#46783E',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerLogo: {
    width: 150,
    height: 200,
    opacity: 0.7,
  },
});