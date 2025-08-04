import { ThemedText } from '@/components/ThemedText';
import { EvilIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import {useEffect, useRef, useState} from 'react';
import { ActivityIndicator, FlatList, Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import axiosConfig from '../../../helpers/axiosConfig';
import RenderItem from "@/components/RenderItem";

export default function ProfileScreen() {
    const [user,setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [data, setData] = useState([]);
    const [isLoadingTweets, setIsLoadingTweets] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
    const flatListRef = useRef(null);
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

  const { userId } = useLocalSearchParams();

  useEffect(() => {
    getUserProfile()
    getUserTweets()
  }, [page]);

  function handleRefresh(){
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshing(true);
    getUserTweets();
  }

  function handleEnd(){
    setPage(page + 1);
  }

  function getUserProfile(){
    axiosConfig.get(`/users/${userId}`)
    .then(response => {

      setUser(response.data)

      setIsLoading(false);
    })
    .catch(error => {
      console.log(error);
      setIsLoading(false);
    })
  }
  const Item = ({ title }) => (
      <View style={{ marginVertical: 20}}>
        <ThemedText> {title}</ThemedText>
      </View>
  );
  function getUserTweets(){
    axiosConfig.get(`/users/${userId}/tweets?page=${page}`)
        .then(response => {
          if(page === 1){
            setData(response.data.data);
          } else{
            setData([...data, ...response.data.data])
          }

          if(!response.data.next_page_url){
            setIsAtEndOfScrolling(true);
          }

          setIsLoadingTweets(false);
          setIsRefreshing(false);
        })
        .catch(error => {
          console.log(error);
          setIsLoadingTweets(false);
          setIsRefreshing(false);
        })
  }


  const ProfileHeader = () => (
    <View style={styles.container}>
         {isLoading ? (
      <ActivityIndicator style={{marginTop:10}} size="large" />
      ):(
        <>
      <Image
          style={styles.backgroundImage} 
          source={{
            uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.18ixid=MnwxMjA%D0%97fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80'
          }} />

      <View style={styles.avatarContainer} >
        <Image
          style={styles.avatar} 
          source={{
            uri: user.avatar
        }} />  
        <TouchableOpacity style={styles.followButton}>
          <ThemedText style={styles.followButtonText}>
          Follow
        </ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.nameContainer}>
        <ThemedText
        style={styles.profileName}>{user.name}
        </ThemedText>
        <ThemedText
          style={styles.profileHandle}>
          @{user.username}
        </ThemedText>
      </ View>

      <View style={styles.profileContainer}>
        <ThemedText style={styles.profileContainerText}>
          {user.profile}
          </ ThemedText>
      </View>

      <View style={styles.locationContainer} >
        <EvilIcons name="location" size={24} color="gray" />
        <ThemedText style={styles.textGray}>{user.location}</ThemedText>
      </View>


      <View style={styles.linkContainer}>
        <TouchableOpacity style={styles.linkItem}
          onPress={() => Linking.openURL(user.link)}>
          <EvilIcons name="link" size={24} color="gray" />
          <ThemedText style={styles.linkColor}>{user.link_text}</ThemedText>
        </TouchableOpacity>
        <View style={[styles.linkItem, styles.ml4]}>
          <EvilIcons name="calendar" size={24} color="gray" />
          <ThemedText style={styles.textGray}>
            Joined {format(new Date(user.created_at),'MMM yyyy')}
            </ThemedText>
        </ View>
      </View>

      <View
        style={styles.followContainer}>
        <View style={styles.followItem}>
          <ThemedText  style={styles.followItemNumber}>509</ThemedText>
          <ThemedText style={styles. followItemLabel}>Following</ThemedText>
        </View>
        <View style={[styles.followItem, styles.ml4]}>
          <ThemedText style={styles.followItemNumber}>2,354</ThemedText>
          <ThemedText style={styles. followItemLabel}>Followers</ThemedText>
        </View>
      </View>

      <View style={styles.separator}></View>

      
      
      </>
      )}
    </View>
  );
  
  return (
      <View style={styles.container}>
        {isLoading ? (
            <ActivityIndicator style={{marginTop:10}} size="large" />
        ):(
        <FlatList
            style={styles.container}
            ref={flatListRef}
            data={data}
            renderItem={({item}) =>
                <>
                  <RenderItem item={item} />
                </>
            }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={()=> <View style={styles.separator}></View>}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            onEndReached={handleEnd}
            onEndReachedThreshold={0}
            ListFooterComponent={() => !isAtEndOfScrolling && (
                <ActivityIndicator size="large" color="gray" />
            )}
            ListHeaderComponent={ProfileHeader}
            scrollIndicatorInsets={{ right: 1 }}
        />
      )}
      </View>
  );
}


const styles = StyleSheet.create({
  textGray: {
    color: 'gray',
  },
  ml4:{
    marginLeft: 16
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage:{
    width: 800,
    height: 120,
  },
  avatarContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginTop: -30
  },
  avatar:{
    width: 80,
    height: 80,
    marginRight: 8,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white'
  },

  followButton: {
    backgroundColor: '#0f1418',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  nameContainer: {
    paddingHorizontal: 10, paddingVertical: 2,
  },
  profileName: {
    fontWeight:
    'bold',
    fontSize: 22
  },
  profileHandle: {
    color: 'gray',
    marginTop: 1
  },

  profileContainer: {
    paddingHorizontal:10,
     marginTop: 8
  },
  profileContainerText: {
    lineHeight: 20
  },
  locationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 12,
  },
  linkContainer: {
    flexDirection: 'row' ,
    paddingHorizontal: 10,
    marginTop: 10
  },

  linkColor: {
    color: '#1d9bf1'
  },
  linkItem: {
    flexDirection: 'row'
  },

  followContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  followItem: {
    flexDirection: 'row',
  },
  followItemNumber:{
    fontWeight: 'bold',
  },
  followItemLabel: {
    marginLeft: 4
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor:'#E5E7EB'
  }
})