import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('diet');

  const userProfile = {
    name: 'Asma Mhatli',
    avatar: require('./../assets/images/asma (2).jpg'),
    dietPreferences: ['Vegetarian', 'Low Carb'],
    allergies: ['Nuts', 'Shellfish'],
    stats: {
      recipesCooked: 42,
      favoriteDishes: 12,
      weeklyMealPlans: 3
    }
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'diet':
        return (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Diet Preferences</Text>
            {userProfile.dietPreferences.map((pref, index) => (
              <View key={index} style={styles.pillContainer}>
                <Text style={styles.pillText}>{pref}</Text>
              </View>
            ))}
            
            <Text style={styles.sectionTitle}>Allergies</Text>
            {userProfile.allergies.map((allergy, index) => (
              <View key={index} style={styles.pillContainer}>
                <Text style={styles.pillText}>{allergy}</Text>
              </View>
            ))}
          </View>
        );
      case 'stats':
        return (
          <View style={styles.sectionContent}>
            <View style={styles.statBox}>
              <Ionicons name="restaurant-outline" size={24} color="#46783E" />
              <Text style={styles.statNumber}>{userProfile.stats.recipesCooked}</Text>
              <Text style={styles.statLabel}>Recipes Cooked</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="heart-outline" size={24} color="#46783E" />
              <Text style={styles.statNumber}>{userProfile.stats.favoriteDishes}</Text>
              <Text style={styles.statLabel}>Favorite Dishes</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="calendar-outline" size={24} color="#46783E" />
              <Text style={styles.statNumber}>{userProfile.stats.weeklyMealPlans}</Text>
              <Text style={styles.statLabel}>Meal Plans</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={ userProfile.avatar } 
          style={styles.avatar} 
        />
        <Text style={styles.name}>{userProfile.name}</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeSection === 'diet' && styles.activeTab
          ]}
          onPress={() => setActiveSection('diet')}
        >
          <Text style={styles.tabText}>Diet Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeSection === 'stats' && styles.activeTab
          ]}
          onPress={() => setActiveSection('stats')}
        >
          <Text style={styles.tabText}>Cooking Stats</Text>
        </TouchableOpacity>
      </View>

      {renderSection()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46783E',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#46783E',
  },
  tabText: {
    color: '#46783E',
    fontWeight: 'bold',
  },
  sectionContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#46783E',
    marginTop: 15,
    marginBottom: 10,
  },
  pillContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 5,
    alignSelf: 'flex-start',
  },
  pillText: {
    color: '#46783E',
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46783E',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#46783E',
    opacity: 0.7,
  },
});