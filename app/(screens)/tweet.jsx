import { ThemedText } from '@/components/ThemedText';
import { Entypo, EvilIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TweetScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.flexRow}>
          <Image
          style={styles.avatar} 
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png'
          }} />
          <View>
            <ThemedText style={styles.tweetName}>
              Jeffry
            </ThemedText>
            <ThemedText style={styles.tweetHandle}>
              @Jeffrymo
            </ThemedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name='dots-three-vertical' size={24} color='gray' />
        </TouchableOpacity>
      </View>

      <View style={styles.tweetContentContainer}>
        <ThemedText style={styles.tweetContent}>
            loreum ipsum loreum ipsumloreum  ipsumloreumipsumloreumipsumloreumipsumloreumipsumloreum ipsumloloreum ipsumloreum ipsumloreum ipsum reum ipsum
        </ThemedText>
      </View>

      <View style={styles.tweetEngagement}>
        <View style={styles.flexRow}>
          <ThemedText style={styles.tweetEngagementNumber}>
              625 
          </ThemedText>
          <ThemedText style={styles.tweetEngagementLabel}>
              Retweet 
          </ThemedText>
        </View>

        <View style={[styles.flexRow, styles.ml4]}>
          <ThemedText style={styles.tweetEngagementNumber}>
              36 
          </ThemedText>
          <ThemedText style={styles.tweetEngagementLabel}>
              Quote Tweets 
          </ThemedText>
        </View>


        <View style={[styles.flexRow, styles.ml4]}>
          <ThemedText style={styles.tweetEngagementNumber}>
              4,432 
          </ThemedText>
          <ThemedText style={styles.tweetEngagementLabel}>
              Likes 
          </ThemedText>
        </View>
      </View>

      <View style={[styles.tweetEngagement, styles.spaceAround]}>
          <TouchableOpacity>
            <EvilIcons
              name='comment' size={30} color='gray'
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <EvilIcons
              name='retweet' size={30} color='gray'
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <EvilIcons
              name='heart' size={30} color='gray'
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <EvilIcons
              name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'} size={30} color='gray'
            />
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
  profileContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  flexRow:{
    flexDirection: 'row'
  },
  avatar:{
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 20
  },
  tweetName:{
    fontWeight: 'bold',
    color: '#222222'
  },
  tweetHandle:{
    color: 'gray',
    marginTop: 1
  },
  tweetContentContainer:{
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  tweetContent:{
    fontSize: 20,
    lineHeight:30,
  },
  tweetEngagement:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  tweetEngagementNumber:{
    fontWeight: 'bold',
  },
  tweetEngagementLabel:{
    color: 'gray',
    marginLeft: 6,
  },
  ml4:{
    marginLeft: 16
  },
  spaceAround:{
    justifyContent: 'space-around'
  }
})
