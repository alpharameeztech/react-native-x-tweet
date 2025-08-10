import { ThemedText } from '@/components/ThemedText';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {useContext, useState} from 'react';
import { ActivityIndicator, Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import axiosConfig from '../../helpers/axiosConfig';
import {AuthContext} from "./context/AuthProvider";
export default function NewTweetScreen() {
  const router = useRouter();
  
  const [tweet,setTweet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  function sendTweet(){

    setIsLoading(true);

    if(tweet.length === 0){
      setIsLoading(false);
      Alert.alert('Please type some tweet');
      return;
    }

    axiosConfig.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${user.token}`;

    axiosConfig.post(`/tweets`,{
      'body': tweet
    })
    .then(response => {
        setIsLoading(false);
        router.push({
          pathname: '/',
          params: { newTweetAdded: JSON.stringify(response.data) }
        });
    })
    .catch(error => {
      console.log(error);
      setIsLoading(false);
    })
  }

  return (
    <View style={styles.container}>
     <View style={styles.tweetButtonContainer}>
      <ThemedText style={tweet.length > 250 ? styles.textRed : styles.textGray}>
        Character left: {280 - tweet.length}
      </ThemedText>
      <View style={{ flexDirection:'row', alignItems: 'center'}}>
        {isLoading && (
          <ActivityIndicator size="small" style={{marginRight:8}} />
        )}
        <TouchableOpacity onPress={() => sendTweet()} style={styles.tweetButton} disabled={isLoading}>
          <ThemedText style={styles.tweetButtonText}>
            Tweet
          </ThemedText>
        </TouchableOpacity>
      </View>
     </View>

    <View style={styles.tweetBoxContainer}>
      <Image
          style={styles.avatar} 
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png'
          }} />

          <TextInput 
            style={styles.input}
            onChangeText={setTweet}
            value={tweet}
            placeholder='Whats happening...'
            placeholderTextColor="gray"
            maxLength={280}
            multiline
          />
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  textGray:{
    color: 'gray'
  },
  textRed:{
    color: 'red',
  },
  ml4:{
    marginLeft: 16
  },
  avatar:{
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 10
  },
  tweetButtonContainer:{
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tweetButton:{
    backgroundColor: '#1d9bf1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24
  },
  tweetButtonText: {
   color: 'white',
   fontWeight: 'bold'
  },

  tweetBoxContainer: {
    flexDirection: 'row', paddingTop: 10,
  },
  avatar: {
    width: 42, height: 42, marginRight: 8, marginTop: 10, borderRadius: 21,
  },
  input:{
    flex:1,
    fontSize: 18,
    lineHeight: 28, 
    padding: 10,
  }
});