import { ThemedText } from '@/components/ThemedText';
import { Entypo, EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import { format } from 'date-fns';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TweetScreen() {
const { tweetId } = useLocalSearchParams();
const [tweet, setTweet] = useState(null)
const [isLoading, setIsLoading] = useState(true);

useEffect(() =>{
getTweet()
}, [])

function getTweet(){
axios.get(`http://127.0.0.1:8000/api/tweets/${tweetId}`)
.then(response => {
    
  setTweet(response.data)
      console.log(response.data)
   
    setIsLoading(false);
})
.catch(error => {
  console.log(error);
  setIsLoading(false);
})
}
  return (
    <View style={styles.container}>
      {isLoading ? (
      <ActivityIndicator style={{marginTop:10}} size="large" />
      ):(
        <>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.flexRow}>
          <Image
          style={styles.avatar} 
          source={{
            uri: tweet.user.avatar
          }} />
          <View>
            <ThemedText style={styles.tweetName}>
              { tweet.user.name}
            </ThemedText>
            <ThemedText style={styles.tweetHandle}>
              @{ tweet.user.username}
            </ThemedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name='dots-three-vertical' size={24} color='gray' />
        </TouchableOpacity>
      </View>

      <View style={styles.tweetContentContainer}>
        <ThemedText style={styles.tweetContent}>
          { tweet.body }
        </ThemedText>

        <View style={styles. tweetTimestampContainer} >
          <ThemedText style={styles. tweetTimestampText}>
            {format(new Date(tweet.created_at), 'h:mm a')}
          </ThemedText>
          <ThemedText style={styles.tweetTimestampText}>&middot;</ThemedText>
          <ThemedText style={styles. tweetTimestampText}>
            {format(new Date(tweet.created_at), 'd MMM.yy')}
          </ThemedText>
          <ThemedText style={styles. tweetTimestampText}>&middot; </ThemedText>
          <ThemedText style={[styles. tweetTimestampText, styles.linkColorl]}> Twitter for iPhone</ThemedText>
        </View>
      
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
      </>
      )}
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
  },

  tweetTimestampContainer: {
    flexDirection: 'row', 
    marginTop: 12,
    paddingHorizontal: 20
  },
  tweetTimestampText: {
    color: 'gray',
    marginRight: 6,
  },
  linkColor: {
   color: '#1d9bf1'
  }
})
