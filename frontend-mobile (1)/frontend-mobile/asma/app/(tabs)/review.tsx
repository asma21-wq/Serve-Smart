import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the icons
import { useRouter } from 'expo-router';

const router = useRouter();
const navigateToHome = () => {
  router.push('/'); // Make sure your route matches
};
export default function ReviewScreen() {
  const [rating, setRating] = useState(0); // Rating state
  const [review, setReview] = useState(''); // Review state
  const [reviewsList, setReviewsList] = useState<any[]>([]); // List to store reviews

  // Function to handle the rating
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  // Function to add the review to the list
  const handleAddReview = () => {
    if (review.trim()) {
      setReviewsList([...reviewsList, { review, rating }]);
      setReview(''); // Clear input field after adding review
      setRating(0); // Reset the rating
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress= {navigateToHome }>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      <Text style={styles.title}>Customer Reviews</Text>

      {/* Review Form Section */}
      <Text style={styles.headerText}>Loved your meal?</Text>

      {/* Star Rating */}
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={30}
              color="#ffd33d"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Additional Instructions */}
      <Text style={styles.subText}>Rate your experience!</Text>
      <Text style={styles.subText}>Don’t forget to add your honest review about our plates</Text>

      {/* Review Input */}
      <TextInput
        style={styles.input}
        placeholder="Add review"
        value={review}
        onChangeText={(text) => setReview(text)}
        multiline
      />

      {/* Button to add the review */}
      <TouchableOpacity style={styles.payButton} onPress={handleAddReview}>
        <Text style={styles.payText}>Submit Review</Text>
      </TouchableOpacity>

      {/* Thank you text */}
      <Text style={styles.thankYouText}>Thank you!</Text>

      {/* Display Customer Reviews */}
      <ScrollView style={styles.reviewsContainer}>
        {reviewsList.length > 0 ? (
          reviewsList.map((item, index) => (
            <View key={index} style={styles.reviewCard}>
              <Text style={styles.reviewRating}>Rating: {item.rating} stars</Text>
              <Text style={styles.reviewText}>{item.review}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noReviewsText}>No reviews yet.</Text>
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c6e2f', // Green color for the header
    textAlign: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c6e2f',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  subText: {
    fontSize: 18,
    color: '#2c6e2f',
    textAlign: 'center',
  },
  input: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  payButton: {
    backgroundColor: '#2c6e2f',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  payText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c6e2f',
    textAlign: 'center',
    marginVertical: 20,
  },
  reviewsContainer: {
    marginTop: 20,
    maxHeight: 200, // limit the height to prevent overflow
  },
  reviewCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewRating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffd33d',
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
  },
  noReviewsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
});