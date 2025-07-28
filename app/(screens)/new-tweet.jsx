import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
export default function NewTweetScreen() {
  return (
    <View style={styles.container}>
     <View style={styles.tweetButtonContainer}>
      <ThemedText>
        Character left: 280
      </ThemedText>
      <TouchableOpacity style={styles.tweetButton}>
        <ThemedText style={styles.tweetButtonText}>
          Character left: 280
        </ThemedText>
      </TouchableOpacity>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textColor:{
    color: 'gray'
  },
  ml4:{
    marginLeft: 16
  },
  followButton:{
    backgroundColor: '#0f1418',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24
  },
  followButtonText: {
   color: 'white',
   fontWeight: 'bold'
  }
});