import { ThemedText } from '@/components/ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FlatList, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
export default function HomeScreen() {
  const router = useRouter();
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  function goToProfile (){
    router.push('profile');
  }

  function goToSingleTweet (){
    router.push('tweet');
  }

  function goToNewTweet(){
    router.push('/new-tweet');
  }
  const Item = ({ title }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => goToProfile()}>
        <Image
        style={styles.avatar} 
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png'
        }} />
      </TouchableOpacity>
      <View style={{ flex:1 }}>
        <TouchableOpacity style={styles.flexRow} onPress={() => goToProfile()}>
          <ThemedText numberOfLines={1} style={styles.tweetName}>{title}</ThemedText>
          <ThemedText numberOfLines={1} style={styles.tweetHandle}>@admire</ThemedText>
          <ThemedText>&middot;</ThemedText>
          <ThemedText numberOfLines={1} style={styles.tweetHandle}>9m</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tweetContentContainer} onPress={() => goToSingleTweet()}>
          <ThemedText style={styles.tweetContent}>
            loreim ipisum loreim ipisumloreim ipisumloreim ipisumloreim ipisumloreim ipisumloreim ipisumloreim ipisum
          </ThemedText>
        </TouchableOpacity>
        
        <View style={styles.tweetEngagement}>
          <TouchableOpacity style={styles.flexRow}>
            <ThemedText>
              <EvilIcons name="comment" size={24} color="gray" />
            </ThemedText>
            <ThemedText style={styles.textGray}>456</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <ThemedText>
              <EvilIcons name="retweet" size={24} color="gray" />
            </ThemedText>
            <ThemedText style={styles.textGray}>456</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <ThemedText>
              <EvilIcons name="heart" size={24} color="gray" />
            </ThemedText>
            <ThemedText style={styles.textGray}>188</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <ThemedText>
              <EvilIcons name={Platform.OS === 'ios'? 'share-apple' : 'share-google'} size={24} color="gray" />
            </ThemedText>
            <ThemedText style={styles.textGray}>188</ThemedText>
          </TouchableOpacity>
          
        </View>
      </View>
      
    </View>
  );
  
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <FlatList
        data={DATA}
        renderItem={({item}) => 
          <>
          <Item title={item.title} />
          </>
        }
        keyExtractor={item => item.id}
        ItemSeparatorComponent={()=> <View style={styles.tweetSeparator}></View>}
      />

      <TouchableOpacity
       style={styles.floatingButton}
       onPress={() => goToNewTweet()}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container:{
    flex:1, alignItems: 'center', justifyContent: 'center'
  },
  tweetContainer:{
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  avatar:{
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 10
  },
  flexRow:{
    flexDirection: 'row'
  },
  tweetName:{
    fontWeight: 'bold',
    color: '#222222'
  },
  tweetHandle:{
    marginHorizontal: 8,
    color: 'gray'
  },
  tweetContentContainer:{
    marginTop: 4,
  },
  tweetSeparator:{
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  tweetContent:{
    lineHeight: 20
  },
  textGray: {
    color: 'gray',
  },
  tweetEngagement:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  ml4:{
    marginLeft: 16
  },
  floatingButton:{
    width:60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d9bf1',
    position: 'absolute',
    bottom: 100,
    right: 12,
  }
});